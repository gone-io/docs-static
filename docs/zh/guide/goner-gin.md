---
sidebar: auto
prev: ./goner-config
next: ./goner-grpc
---

# 使用`goner/gin`提供Web服务

## 注册相关的Goners
这里我们编写一个`Priest`函数，用于注册相关的Goners。
```go
package main
import (
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner"
)

// 用于注册Goners的Priest函数
func Priest(cemetery gone.Cemetery) error {
	//注册gin相关的Goners
	_ = goner.GinPriest(cemetery)

    //TODO: 注册其他的Goners
	return nil
}

func main() {
    // 在main函数中使用Priest函数启动服务
	gone.Serve(Priest)
}
```
将上面代码保存为`main.go`，，代码已经能够正常运行起来了，运行中代码会监听本地`8080`端口，但是所有的请求都是返回404。

## 编写Controller挂载路由
为了提供服务，而不只是返回404，我们需要编写一个Controller，挂载路由。
新建文件`controller.go`，编写如下代码：
```go
// NewController controller 的构造函数
func NewController() gone.Goner {
	return &controller{}
}

type controller struct {
	gone.Flag
	root gone.RouteGroup `gone:"*"` // 根路由组
}

func (ctr *controller) Mount() gone.GinMountError {
	ctr.root.GET("/ping", func() string {
		return "hello gone"
	})
	return nil
}
```

然后，在`main.go`文件`Priest`函数中添加注册`Controller`的代码：
```go
	//注册Controller
	cemetery.Bury(NewController())
```
再次运行代码：`go run .`，使用`curl`命令访问`localhost:8080/ping`，返回`{"code":0,"data":"hello gone"}`。

上面代码中，`controller`通过实现方法`Mount() gone.GinMountError`成为`gin.Controller`，`goner/gin`启动过程中会自动调用`Mount()`方法；我们需要再该方法中挂载我们希望处理的路由。

为此，我们需要在`controller`上添加一个`gone.RouteGroup`类型的`root`字段，使用`gone:"*"`标记为依赖注入；Gone会将代表根路由的`gone.RouteGroup`装配到root属性上。`gone.RouteGroup`是一个接口，定义了用于挂载路由的`GET`、`POST`等方法，下面是其定义：
```go
type IRoutes interface {
	Use(...HandlerFunc) IRoutes

	Handle(string, string, ...HandlerFunc) IRoutes
	Any(string, ...HandlerFunc) IRoutes
	GET(string, ...HandlerFunc) IRoutes
	POST(string, ...HandlerFunc) IRoutes
	DELETE(string, ...HandlerFunc) IRoutes
	PATCH(string, ...HandlerFunc) IRoutes
	PUT(string, ...HandlerFunc) IRoutes
	OPTIONS(string, ...HandlerFunc) IRoutes
	HEAD(string, ...HandlerFunc) IRoutes
}

type IRouter interface {
	IRoutes

	GetGinRouter() gin.IRouter

	Group(string, ...HandlerFunc) RouteGroup

	LoadHTMLGlob(pattern string)
}

// RouteGroup route group, which is a wrapper of gin.RouterGroup, and can be injected for mount router.
type RouteGroup interface {
	IRouter
}
```

## 路由处理函数

通过`RouteGroup`定义可以看到，`GET`、`POST`等用于挂载路由的函数，都可以接收多个`HandlerFunc`参数。HandlerFunc要求是一个函数，这里称为**路由处理函数**。

路由处理函数，可以接收多个参数，也可以返回多个值；一般返回两个值，一个正常值 和 一个 error 值，如下：
```go
func processRoute(ctx *gin.Context) (string, error) {
    return "hello gone", nil
}
```

正常值的类型可以为 golang 的简单类型（int、string、float 等）、结构体、指针、接口、数组、slice、map 等；还可以返回 `io.Reader` 和 `chan any`两种特殊类型。

### io.Reader
通过io.Reader可以返回任意的数据，比如返回一个文件：
```go
	ctr.root.GET("/file", func() (io.Reader, error) {
		return os.Open("main.go")
	})
```
重启后，用curl测试：`curl -o main.go http://localhost:8080/file`，可以下载到main.go文件。

特别提醒一下，将`http://localhost:8080/file`输入到浏览器地址栏并不会触发下载，而是直接显示了文件内容，这是因为返回的是文本内容，并且又缺少触发下载的Header：`Content-Disposition`。

### chan any

通过返回chan any，可以方便的实现一个SSE服务。
```go
	type Info struct {
		Msg   string `json:"msg"`
		Index int    `json:"index"`
	}
	ctr.root.GET("/sse", func() chan any {
		ch := make(chan any)
		go func() {
			defer close(ch) //注意关闭channel

			for i := 0; i < 3; i++ {
				time.Sleep(time.Second)
				ch <- Info{
					Index: i,
					Msg:   "hello gone",
				}
			}
		}()
		return ch
	})
```

在`Mount` 函数中添加上面代码，然后重启服务。使用curl测试：`curl http://localhost:8080/sse`，可以得到如下输出（每秒收到一个event）：
```log
event: data
data: {"msg":"hello gone","index":0}

event: data
data: {"msg":"hello gone","index":1}

event: data
data: {"msg":"hello gone","index":2}

event: done
```


## HTTP请求参数注入
路由处理函数的参数，支持依赖注入。
1. 支持注册到Gone的Goners类型直接作为参数，例如以`gone.Logger`类型作为参数：
```go
	ctr.root.GET("inject", func(logger gone.Logger) string {
		logger.Infof("inject")
		return "inject"
	})
```
2. 支持以`*gin.Context`、`*gone.Context`类型作为参数:
> `gone.Context` 是对 `gin.Context`的封装，兼容`gin.Context`。

```go
	ctr.root.GET("inject", func(logger gone.Logger, ctx *gone.Context) string {
		logger.Infof("inject")
		logger.Infof("hots: %s", ctx.Request.Host)

		return "inject"
	})
```
3. 支持参数为一个匿名结构体，在结构体上做依赖注入标记：
```go
	ctr.root.GET("inject", func(logger gone.Logger, ctx gone.Context, in struct {
		selects []int       `gone:"http,query=select"` //HTTP参数注入：表示取query参数中的select作为数组，要求值可以转为int类型
		logger2 gone.Logger `gone:"*"`                 //注入gone.Logger类型的logger
	}) string {
		logger.Infof("inject")
		logger.Infof("hots: %s", ctx.Request.Host)
		logger.Infof("selects: %v", in.selects)

		return "inject"
	})
```
更多关于 HTTP请求参数注入 只是，请参考：[HTTP 注入说明](https://goner.fun/zh/references/http-inject.html)

## 配置项
`goner/gin`支持通过配置，改变默认行为；关于配置的读取和配置文件的格式参考 [配置读取](https://goner.fun/zh/guide/goner-config.html)

### 例子，将端口改为 `8000`

创建配置文件：
```bash
mkdir config
echo 'server.port=8000' > config/default.properties
```

### 更多配置项
| 配置项                       | 说明                                                             | 类型   | 默认值  |
| ---------------------------- | ---------------------------------------------------------------- | ------ | ------- |
| server.port                  | 监听端口                                                         | int    | 8080    |
| server.host                  | 监听地址                                                         | string | 0.0.0.0 |
| server.mode                  | gin mode，可选值为：debug、test、release                         | string | release |
| server.html-tpl-pattern      | 用于gin.LoadHTMLGlob加载模版路径                                 | string | <空>    |
| server.health-check          | 配置一个路径用于监控检查                                         | string | <空>    |
| server.log.show-access-log   | 是否打印访问日志                                                 | bool   | true    |
| server.log.show-request-time | 是否在日志中打印请求耗时                                         | bool   | true    |
| server.log.data-max-length   | 日志数据最大长度，超过该长度会截断，0为不限制                    | int    | 0       |
| server.proxy.stat            | 代理耗时统计                                                     | bool   | false   |
| server.return.wrapped-data   | 使用`{"code": ${code}, "msg": ${msg}, "data": ${data} }`封装数据 | bool   | true    |


### 更多例子

跳转 [快速开始](https://goner.fun/zh/quick-start/)
---
sidebar: auto
prev: false
next: ./quick-start/
---
# 介绍
<img src="../img/logo.png" width = "300" alt="logo"/>

## Gone是什么
首先，Gone是Golang的一个轻量级的**依赖注入框架**，目前依赖注入的装配流程是通过反射来实现的；虽然golang的反射一直被人诟病太慢，但是在Gone中依赖注入只是程序的启动阶段，不影响运行阶段的速度，最多就是给启动过程增加几毫秒的时间，带来的好处却是不再需关心各种依赖如何创建。

其次，为了方便用户能够快速上手，我们开发了一系列内置组件，比如 xorm、redis、schedule、tracer、logrus、gin、cmux、zap、viper 等等，后续我们还会支持更多微服务中间件的接入；用户可以利用这些组件快速开发出一个云原生的微服务，所以Gone**一套微服务解决方案**。


## 特性
- 定义Goner接口，对依赖进行抽象
- 依赖注入
  - 注入Goners
  - 注入函数参数
- 模块化，可拆卸设计
- 启动流程控制
- 测试支持
- 内置组件
  - goner/config，支持配置参数的依赖注入
  - goner/tracer，给调用链路增加TraceId，支持链路追踪
  - goner/logrus、goner/zap，支持日志记录
  - goner/gin，集成gin框架，提供HTTP请求参数的依赖注入
  - goner/viper，用于解析多种配置文件
  - ...



## 小试牛刀

下面使用**Gone**来编写一个简单的Web服务，更多例子在[快速开始](https://goner.fun/zh/quick-start/) 和 [example](https://github.com/gone-io/gone/tree/main/example)。

```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner"
)

// 实现一个Goner，什么是Goner？ => https://goner.fun/zh/guide/core-concept.html#goner-%E9%80%9D%E8%80%85
type controller struct {
	gone.Flag //goner 标记，匿名嵌入后，一个结构体就实现了Goner
	gone.RouteGroup `gone:"gone-gin-router"` //注入根路由
}

// 实现 Mount 方法，挂载路由；框架会自动执行该方法
func (ctr *controller) Mount() gone.GinMountError {

	// 定义请求结构体
	type Req struct {
		Msg string `json:"msg"`
	}

	//注册 `POST /hello` 的 处理函数
	ctr.POST("/hello", func(in struct {
		to  string `gone:"http,query"` //注入http请求Query参数To
		req *Req   `gone:"http,body"`  //注入http请求Body
	}) any {
		return fmt.Sprintf("to %s msg is: %s", in.to, in.req.Msg)
	})

	return nil
}

func main() {
	//启动服务
	gone.Serve(func(cemetery gone.Cemetery) error {
		// 调用框架内置组件，加载gin框架
		_ = goner.GinPriest(cemetery)

		//将 一个controller类型的Goner埋葬到墓园
		//埋葬是什么意思？ => https://goner.fun/zh/guide/core-concept.html#bury-%E5%9F%8B%E8%91%AC
		//墓园是什么意思？ => https://goner.fun/zh/guide/core-concept.html#cemetery-%E5%A2%93%E5%9B%AD
		cemetery.Bury(&controller{})
		return nil
	})
}
```

运行上面代码：`go run main.go`，程序将监听`8080`端口，使用curl测试：
```bash
curl -X POST 'http://localhost:8080/hello' \
-H 'Content-Type: application/json' \
--data-raw '{"msg": "你好呀？"}'
```
结果如下：
```bash
{"code":0,"data":"to  msg is: 你好呀？"}
```

## 概念与启动流程
### 人话版本
> 代码写完了，跑得起来才行。

在Gone框架中，组件叫住Goner，Goner的属性可以是：interface、slice、map，程序启动时他们将被自动装配。在Gone启动前，需要将所有的Goners注册到Gone框架，启动时Gone会对所有Goners的属性进行自动装配，完成依赖注入，编写组件不必关心依赖的实现和依赖的接口是如何来的，只需要直接使用就可以了。

### 鬼话版本
> 我们编写的代码终究只是死物，除非他们被运行起来。

在Gone中，组件被抽象为 Goner（逝者），Goner 属性可以注入其他的 Goner 。Gone启动前，需要将所有 Goners 埋葬 到 墓园；Gone启动后，会 复活 所有 Goners，建立一个 天国，“天国的所有人都不再残缺，他们想要的必定得到满足”。


### 代码版本
```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
)

// Worker 接口
type Worker interface {
	Do()
}
type Boss struct {
	gone.Flag
	workers []Worker `gone:"*"` //Boss 依赖 Worker接口，通过 gone标签标记为需要依赖注入
}

func (b *Boss) Do() {
	for _, w := range b.workers {
		w.Do()
	}
}

// WorkerX 实现 Worker 接口
type WorkerX struct {
	gone.Flag
}

func (w *WorkerX) Do() {
	fmt.Println("WorkerX Do")
}

func main() {
	gone.
		//Goner启动前的准备工作
		Prepare(func(cemetery gone.Cemetery) error {
			cemetery.
				//注册Boss
				Bury(&Boss{}).

				//注册多个Worker Goners
				Bury(&WorkerX{}).
				Bury(&WorkerX{}).
				Bury(&WorkerX{})
			return nil
		}).
		//Goner启动
		Run(func(boss *Boss) { //Run 方法中的参数被自动注入
			boss.Do()
		})
}
```

了解更多，请阅读 [开发指南](https://goner.fun/zh/guide/)

## 关于Logo
Golang的吉祥物是一只可爱的地鼠，Gone的Logo是从它衍生出来，加上翅膀加上光圈，是一只天使地鼠，我们感觉这很复活Gone鬼故事的气质。

## 联系方式
如果您有任何问题，欢迎通过以下方式联系我们：
- [Github 讨论](https://github.com/gone-io/gone/discussions)
- 扫码加微信，暗号：gone

  <img src="../img/qr_dapeng.png" width = "250" alt="dapeng wx qr code"/>
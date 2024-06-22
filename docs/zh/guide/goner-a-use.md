---
sidebar: auto
prev: ./inject-3-func
next: ./goner-config
---

# 如何使用内置Goners?

[[toc]]

## 内置Goners

为了降低Gone的使用门槛，我们开发了一些 [内置Goners](/zh/goners/#框架内置goners) ，用于快速开发，比如提供Web服务、提供数据库连接、提供redis连接、提供定时任务等。

## 使用`goner.*Priest`注册Goners
比如，通过 `goner.GinPriest` 注册 Web服务依赖的Goners：
```go
//...

func Priest(cemetery gone.Cemetery) error {

	// 通过 `goner.GinPriest` 注册 Web服务依赖的Goners：
	_ = goner.GinPriest(cemetery)

	// 注册其他依赖的Goners
	//...
	return nil
}

func main() {
	// 启动服务
	gone.Serve(Priest)
}
```
## 使用`gone`标记依赖
比如，编写Web服务的Controller是注入`goner/gin`提供的`gin.RouteGroup`接口：
```go
type controller struct {
	gone.Flag
	router gin.RouteGroup `gone:"*"` //注册 gin 的默认路由分组
}

// 实现 goner/gin 中定义的 Controller 接口，用于挂载路由
func (ctr *controller) Mount() gin.MountError {

	// 定义 GET /ping 的处理函数
	ctr.router.GET("/ping", func(c *gin.Context) (any, error) {
		return "hello", nil
	})
	return nil
}
```

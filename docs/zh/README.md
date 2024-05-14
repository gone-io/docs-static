---
sidebar: auto
prev: false
next: ./quick-start/
---
# 介绍

## Gone是什么
首先，**Gone**是一个轻量的，基于**Golang**的，**依赖注入框架**，灵感来源于Java中的Spring Framework；其次，**Gone**框架中包含了一系列内置组件，通过这些组件提供一整套Web开发方案，提供服务配置、日志追踪、服务调用、数据库访问、消息中间件等微服务常用能力。


下面使用**Gone**来编写一个Web服务吧！

## Web服务
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

## 概念
> 我们编写的代码终究只是死物，除非他们被运行起来。

在Gone中，组件被抽象为**Goner（逝者）**，**Goner**属性可以注入其他的**Goner**。Gone启动前，需要将所有 **Goners** **埋葬（Bury）**到**墓园（cemetery）**；Gone启动后，会将所有 **Goners** **复活**，建立一个 **天国（Heaven）**，“天国的所有人都不再残缺，他们想要的必定得到满足”。

了解更多，请阅读 [Gone的核心概念](https://goner.fun/zh/guide/core-concept.html)


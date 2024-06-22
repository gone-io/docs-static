---
sidebar: auto
prev: ./goner-schedule
next: ./goner-xorm
---

# 使用traceId追踪日志
在Web应用中，一次请求可能会经过很多业务流程的处理；为了方便排查问题，我们希望所有业务流程打印的日志拥有一个统一的traceId；拥有traceId，就可以将整个业务流程的日志都串起来，回溯和分析问题出在哪个业务环节。
在其他开源框架中，一般采用策略是在**所有**的函数中都增加`context.Context`参数，golang官方也是这样推荐的。然而我们认为这样平白无故的多打一些代码实在很难受，我们希望不用在每个函数中传递额外参数实现打印日志中附件traceId。为此，我们在Gone中提供了一个内置的Goner来提供这样的功能。

## 将相关Goners注册到Gone
> tip: 了解Gone的核心概念和术语请阅读：[Gone的核心概念](https://goner.fun/zh/guide/core-concept.html)

在这里，我们采用`github.com/gone-io/gone/tree/main/goner`包中的 **`BasePriest`** 来完成相关Goners的注册。在`BasePriest`中会将 `tracer`、`config`、`logrus` 相关的Goners同注册到Gone，这三个包一般一起使用。

```go

func MasterPriest(cemetery gone.Cemetery) error {
	_ = goner.BasePriest(cemetery)

	//注册其他Goners
    // todo
	return nil
}
```

## 简单使用
在注册了tracer的情况下，我们通过注入的`logrus.Logger`接口打印日志时，日志中会自动添加一串traceId。
```go
//...

type service struct {
    gone.Flag
    log logrus.Logger `gone:"gone-logger"` //具名注入到 嵌套的log属性上
}

func (svc *service) Business(input string) (string, error) {

    //打印日志
	svc.log.Infof("input content is %s", input)

	return input, nil
}

//...
```
如下，其中`061ad00f-8c0d-479c-bc4c-393e0cf2cca2`为traceId：
```
2024-05-11 09:09:57.784|INFO|**/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.1.4/goner/gin/server.go:46**|061ad00f-8c0d-479c-bc4c-393e0cf2cca2|Server Listen At :8080
```

## 跨协程（goroutine）传递traceId
前面例子中，如果没有新开协程是正常的，如果使用关键词`go`开一个新的协程，会发现协程打印的日志没有traceId。
怎么解决，注入`tracer.Tracer`接口，使用之前的`Go`方法来代替`go`关键词来新开协程，如下：
```go
//...
type service struct {
    gone.Flag
    log logrus.Logger `gone:"gone-logger"` //具名注入到 嵌套的log属性上
    tracer.Tracer `gone:"gone-tracer"` //注入tracer
}

func (svc *service) Business(input string) (string, error) {

	svc.Go(func() {
        //新协程中打印日志
		svc.log.Infof("log in new goroutine")
	})

	return input, nil
}
//...
```

## 跨进程/服务传递traceId
在微服务中，一个web请求一般会跨域多个微服务，跨域微服务的方式一般会通过：
1. 消息中间件
   为实现traceId在消息中间件中传递和更方便的使用消息中间件传递业务事件，我们开源了[https://github.com/gone-io/emitter](https://github.com/gone-io/emitter)仓库，在这个仓库中实现了**Rocket MQ**的适配，后续计划适配**Kafka**、**RabbitMQ**等主流的消息中间件。
2. RPC调用/内部http调用
    通过Gone内置的Goner [urllib](https://github.com/gone-io/gone/tree/main/goner/urllib) 来给Gone Web程序发送http请求，traceId会自动在服务间传递。另外使用内置的 [grpc](https://github.com/gone-io/gone/tree/main/goner/grpc) 来实现gRpc调用也能自动传递traceId。后续会支持更多的rpc调用。

## 多语言支持
在http请求中传递traceId，是通过在请求头中增加了一个特殊的头`X-Trace-ID`来携带traceId。所以如果使用了多种开发语言，不同服务间只要遵守“在Client端请求时附件`X-Trace-ID`，在Server端处理请求时解析`X-Trace-ID`”，就能实现让traceId跨域不同语言开发的微服务。  
后续会开发其他语言的包支持其他语言无缝接入。
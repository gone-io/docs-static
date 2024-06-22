---
sidebar: auto
prev: ./goner-grpc
next: ./goner-redis
---

# 日志输出

在Gone中，提供了一个内置Goner用于日志输出——[logrus](github.com/gone-io/gone/tree/main/goner/logrus)，是通过将`github.com/sirupsen/logrus`包封装为Goner实现的。希望有小伙伴封装其他的日志输出包，提供更多的日志解决方法。

## 将相关Goners注册到Gone

> tip: 了解Gone的核心概念和术语请阅读：[Gone的核心概念](https://goner.fun/zh/guide/core-concept.html)

在这里，我们采用`github.com/gone-io/gone/tree/main/goner`包中的 **`LogrusLoggerPriest`** 来完成相关Goners的注册。在`LogrusLoggerPriest`中同时被注册的还包括配置和tracer相关的Goners，这三个包一般一起使用。

```go

func MasterPriest(cemetery gone.Cemetery) error {
	_ = goner.LogrusLoggerPriest(cemetery)

	//注册其他Goners
	//todo ...
	return nil
}
```


## 在配置文件中添加相关配置
> tip: [通过内置Goners支持配置文件](https://goner.fun/zh/guide/config.html)

**支持的配置项**
- log.level，日志级别，默认为info；支持的级别：
  - panic
  - fatal
  - error
  - warn 或者 warning
  - info
  - debug
  - trace
- log.report-caller，如果为true日志将打印调用日志输出位置的文件名和行号,例如：

    2024-05-11 09:09:57.784|INFO|**/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.1.4/goner/gin/server.go:46**|061ad00f-8c0d-479c-bc4c-393e0cf2cca2|Server Listen At :8080

- log.output，日志输出的位置，默认为stdout（标准输出），支持stderr 和 一个文件路径
    > **最佳实践：** 将应用部署在容器中，日志直接输出到标准输出，由收集组件采集日志，比较成熟的方法比如EFK

## 打印日志
使用`Info`方法打印日志：

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
其他级别的日志打印，参考接口代码:
```go
// Logger 日志接口
type Logger interface {
	Tracef(format string, args ...any)
	Debugf(format string, args ...any)
	Infof(format string, args ...any)
	Printf(format string, args ...any)
	Warnf(format string, args ...any)
	Warningf(format string, args ...any)
	Errorf(format string, args ...any)
	Fatalf(format string, args ...any)
	Panicf(format string, args ...any)

	Trace(args ...any)
	Debug(args ...any)
	Info(args ...any)
	Print(args ...any)
	Warn(args ...any)
	Warning(args ...any)
	Error(args ...any)
	Fatal(args ...any)
	Panic(args ...any)

	Traceln(args ...any)
	Debugln(args ...any)
	Infoln(args ...any)
	Println(args ...any)
	Warnln(args ...any)
	Warningln(args ...any)
	Errorln(args ...any)
	Fatalln(args ...any)
	Panicln(args ...any)
}
```


## 日志的格式

`${日志输出时间}|${日志级别}|${打印日志的源代码位置}|${TraceId}|${日志内容}`

例如：
```
2024-05-11 09:09:57.784|INFO|**/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.1.4/goner/gin/server.go:46**|061ad00f-8c0d-479c-bc4c-393e0cf2cca2|Server Listen At :8080
```

## 关于TraceId
在web应用中，我们希望有一个统一的编号来标识同一请求产生的日志。这个统一的Id，就是TraceId，如果有这个Id，排查问题时，我们只需要使用这个Id搜索日志，就可以获取请求的所有日志。

## 使用`goner/zap`输出日志
在v1.x版本中，我们提供了`goner/zap`包，可以替换`goner/logrus`包，输出日志。
`goner/zap` 封装了[zap](https://github.com/uber-go/zap)包，并实现了`goner.Logger`接口，可以更高效的输出日志，并且支持更多自定义。

具体使用参考：[goner/zap 使用说明](https://goner.fun/zh/references/1-zap.html)
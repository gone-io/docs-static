---
sidebar: auto
prev: ./redis
next: ./
---

# `goner/zap` 使用说明

## 注册到Gone
```go
	//注册 `goner/zap` 相关的Goners
	_ = goner.ZapLoggerPriest(cemetery)
```
注意：应该将`goner/zap`注册的注册放到其他Goners注册之前，如果zap注册了，默认使用的logrus就不会再注册，反之如果logrus注册了，zap就不会再注册。

## 使用 sugar logger
```go
type MyService struct {
    gone.Flag
    gone.Logger `gone:"*"`
}

func (s *MyService) print() {
    s.Info("hello gone")
}
```
gone.Logger 接口的实现使用的就是zap sugar，所以直接注入`gone.Logger`，就可以直接使用zap sugar了。

## 使用 zap logger
```go
type MyService struct {
    gone.Flag
    gone_zap.Logger `gone:"*"`
}

func (s *MyService) print() {
    ctr.Info("print", zap.String("name", "gone"))
}
```
通过注入`gone_zap.Logger`，就可以直接使用zap logger了。

## provider模式，给当前模块提供logger
- sugar logger
```go
type MyService struct {
    gone.Flag
    gone.Logger `gone:"zap,my-service"`
}
func (s *MyService) print() {
      s.Info("hello gone")
}
```
上面代码将创建一个新的名为 `my-service` 的 sugar logger。

- zap logger
```go
type MyService struct {
    gone.Flag
    gone_zap.Logger `gone:"zap,my-service"`
}

func (s *MyService) print() {
    ctr.Info("print", zap.String("name", "gone"))
}
```
上面代码将创建一个新的名为 `my-service` 的 zap logger。

## 配置项
`goner/zap`支持通过配置，改变默认行为；关于配置的读取和配置文件的格式参考 [配置读取](https://goner.fun/zh/guide/goner-config.html)

| 配置项                    | 说明                                                                                                                  | 类型   | 默认值  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| log.level                 | 日志级别，支持 debug、info、warn、error、panic、fatal                                                                 | string | info    |
| log.enable-trace-id       | 是否开启traceId，开启traceId后，日志会增加traceId字段                                                                 | bool   | true    |
| log.disable-stacktrace    | 是否禁用堆栈信息，禁用堆栈信息后，日志不会增加堆栈信息                                                                | bool   | false   |
| log.stacktrace-level      | 输出日志时同时打印堆栈信息的级别，支持 debug、info、warn、error、panic、fatal                                         | string | error   |
| log.report-caller         | 是否打印调用方信息，包括文件名、代码行号和函数名                                                                      | bool   | true    |
| log.encoder               | 日志格式，支持 console、json                                                                                          | string | console |
| log.output                | 日志输出位置，支持 stdout、stderr、file，如果配置了file，则日志会输出到file指定的位置；支持多个路径，使用`,`分隔      | string | stdout  |
| log.error-output          | 错误日志输出位置，支持 stdout、stderr、file，如果配置了file，则日志会输出到file指定的位置；支持多个路径，使用`,`分隔  | string | <空>    |
| log.rotation.output       | 日志轮转输出位置，支持 stdout、stderr、file，如果配置了file，则日志会输出到file指定的位置；配置后开启日志轮转         | string | <空>    |
| log.rotation.error-output | 错误日志轮转输出位置，支持 stdout、stderr、file，如果配置了file，则日志会输出到file指定的位置；配置后开启错误日志轮转 | string | <空>    |
| log.rotation.max-size     | 日志轮转，文件最大大小，单位MB                                                                                        | int    | 100     |
| log.rotation.max-files    | 日志轮转，文件最大数量                                                                                                | int    | 10      |
| log.rotation.max-age      | 日志轮转，文件最大保存天数                                                                                            | int    | 30      |
| log.rotation.local-time   | 日志文件轮转是否使用本地时间戳                                                                                        | bool   | true    |
| log.rotation.compress     | 日志轮转文件是否压缩                                                                                                  | bool   | false   |


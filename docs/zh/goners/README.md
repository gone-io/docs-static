---
sidebar: auto
prev: ../references/
next: ../
---

# Goners

## 核心级Goners
> 核心组件也是Goner，可以被其他Goner注入，这部分Goners，是Gone运行的和兴，是Gone运行不可或缺的部分。

|接口名 | 实现| GoneId|功能介绍|
|---|---|---|--|
|[Heaven](https://pkg.go.dev/github.com/gone-io/gone#Heaven)|[heaven](https://github.com/gone-io/gone/blob/12ea8e3577fbed493766f522ab002136edf3805d/heaven.go#L65)|gone-heaven|负责将Goner从cemetery中复活，执行安装的Hook函数，管理框架的启停流程和状态。|
|[Cemetery](https://pkg.go.dev/github.com/gone-io/gone#Cemetery)|[cemetery](https://github.com/gone-io/gone/blob/12ea8e3577fbed493766f522ab002136edf3805d/cemetery.go#L17)|gone-cemetery|管理Goners，提供将Goner埋葬的Bury方法；依赖注入的逻辑主要在该结构体中实现。|

## 框架内置Goners
框架内置Goners，是为丰富Gone的功能而开发的，比如支持Web开发、支持数据库连接、支持Redis等…  
代码实现在 [goner目录](https://github.com/gone-io/gone/tree/v0.1.4/goner)，该目录下的每个子目录分别实现了一个gone的特性，每个特性包含一个或多个Goner的定义和实现。

为了方便使用，我们在 [goner/priest.go](https://github.com/gone-io/gone/blob/v0.1.4/goner/priest.go) 中定义了`Priest`函数，可以按功能直接批量埋葬相关Goners。



|目录/组件|实现功能|文档|
|---|--|--|
|config|读取config目录下的配置文件，允许配置项注入到Goner|[通过内置Goners支持配置文件](../guide/config.md)|
|logrus|封装`github.com/sirupsen/logrus`，提供日志打印相关的方法，支持将日志按格式打印|[日志打印](../guide/logrus.md)|
|tracer|日志追踪，提供traceId；在处理同一请求时，日志打印可以拥有相同的traceId|[使用traceId追踪日志](../guide/tracer.md)|
|gin|封装`github.com/gin-gonic/gin`，使gone支持web开发|-|
|xorm|封装`xorm.io/xorm`，用于操作数据|[通过内置Goners支持数据库连接](../guide/xorm.md)|
|redis|封装`github.com/gomodule/redigo/redis`，用于操作redis，提供redis缓存和redis分布式锁的功能|[利用redis提供分布式锁和分布式缓存](../guide/redis.md)|
|schedule|封装`github.com/robfig/cron/v3`，提供定时任务的能力|-|
|urllib|封装`github.com/imroc/req/v3`，提供http调用能力|-|
|grpc|提供开发grpc服务端和客户端的能力|-|
|cmux|封装`github.com/soheilhy/cmux`，是统一端口可以提供混合服务的能力|-|

## 生态级 Goners
- [emitter](https://github.com/gone-io/emitter)，封装事件处理，可以用于 DDD 的 事件风暴
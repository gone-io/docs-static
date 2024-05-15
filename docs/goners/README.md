---
sidebar: auto
prev: ../references/
next: ../
---
# Goners

## Core-Level Goners
> Core components are also Goners that can be injected into other Goners. These Goners are essential for the operation of Gone and are indispensable parts of the framework.

| Interface | Implementation | GoneId | Description |
|---|---|---|--|
| [Heaven](https://pkg.go.dev/github.com/gone-io/gone#Heaven) | [heaven](https://github.com/gone-io/gone/blob/12ea8e3577fbed493766f522ab002136edf3805d/heaven.go#L65) | gone-heaven | Responsible for resurrecting Goners from the cemetery, executing installed Hook functions, and managing the framework's startup and shutdown processes and states. |
| [Cemetery](https://pkg.go.dev/github.com/gone-io/gone#Cemetery) | [cemetery](https://github.com/gone-io/gone/blob/12ea8e3577fbed493766f522ab002136edf3805d/cemetery.go#L17) | gone-cemetery | Manages Goners and provides the Bury method for burying Goners. The dependency injection logic is mainly implemented in this structure. |

## Built-in Framework Goners
Built-in framework Goners are developed to enrich the functionality of Gone, such as supporting web development, database connections, Redis, etc. The code is implemented in the [goner directory](https://github.com/gone-io/gone/tree/v0.1.4/goner). Each subdirectory under this directory implements a feature of Gone, each containing the definition and implementation of one or more Goners.

For ease of use, we have defined the `Priest` function in [goner/priest.go](https://github.com/gone-io/gone/blob/v0.1.4/goner/priest.go), which can directly bury related Goners in batches according to functionality.

| Directory/Component | Functionality | Documentation |
|---|--|--|
| config | Reads configuration files from the config directory and allows configuration items to be injected into Goners | [Supporting configuration files with built-in Goners](../guide/config.md) |
| logrus | Wraps `github.com/sirupsen/logrus` to provide logging methods and supports formatted log printing | [Logging](../guide/logrus.md) |
| tracer | Log tracing, providing traceId; when handling the same request, logs can have the same traceId | [Tracking logs with traceId](../guide/tracer.md) |
| gin | Wraps `github.com/gin-gonic/gin` to support web development with Gone |-|
| xorm | Wraps `xorm.io/xorm` for database operations | [Supporting database connections with built-in Goners](../guide/xorm.md) |
| redis | Wraps `github.com/gomodule/redigo/redis` for Redis operations, providing Redis caching and distributed locking functionality |[Using Redis for Distributed Locking and Caching](../guide/redis.md)|
| schedule | Wraps `github.com/robfig/cron/v3` to provide scheduling capabilities |-|
| urllib | Wraps `github.com/imroc/req/v3` to provide HTTP call capabilities |-|
| grpc | Provides capabilities for developing gRPC servers and clients |-|
| cmux | Wraps `github.com/soheilhy/cmux` to enable mixed services on a unified port |-|

## Ecosystem-Level Goners
- [emitter](https://github.com/gone-io/emitter), wraps event handling and can be used for event storming in DDD


---
sidebar: auto
prev: ./goner-inject
next: ./config
---

# How to Gracefully Use Built-in Goners?

[[toc]]

## Built-in Goners

To lower the entry barrier for using Gone, we have developed some [built-in Goners](/goners/#built-in-framework-goners) to provide basic functionality.

## The `Priest` Function
The `Priest` function is defined within the gone framework, and it allows for the bulk burial of Goners. Additionally, the `Priest` function can be nested, meaning A can call B, and B can call C. Therefore, after developing a set of features, you can provide a `Priest` function that buries all the Goners used.

In fact, when developing built-in Goners for the framework, we adopt this approach. Additionally, for ease of use, we have defined some shortcuts in `goner/priest.go`, as shown below:

```go
package goner

import (
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/config"
	"github.com/gone-io/gone/goner/gin"
	"github.com/gone-io/gone/goner/logrus"
	"github.com/gone-io/gone/goner/redis"
	"github.com/gone-io/gone/goner/schedule"
	"github.com/gone-io/gone/goner/tracer"
	"github.com/gone-io/gone/goner/urllib"
	"github.com/gone-io/gone/goner/xorm"
)

func BasePriest(cemetery gone.Cemetery) error {
	_ = tracer.Priest(cemetery)
	_ = logrus.Priest(cemetery)
	_ = config.Priest(cemetery)
	return nil
}

func GinPriest(cemetery gone.Cemetery) error {
	_ = gin.Priest(cemetery)
	return nil
}

func XormPriest(cemetery gone.Cemetery) error {
	_ = xorm.Priest(cemetery)
	return nil
}

func RedisPriest(cemetery gone.Cemetery) error {
	_ = redis.Priest(cemetery)
	return nil
}

func SchedulePriest(cemetery gone.Cemetery) error {
	_ = schedule.Priest(cemetery)
	return nil
}

func UrllibPriest(cemetery gone.Cemetery) error {
	return urllib.Priest(cemetery)
}
```

## How to Use

This way, if we want to use basic logging, tracing, and configuration functionality, we only need to:
1. Add `gone.BasePriest(cemetery)` in the main `Priest` function:
    ```go
    func MasterPriest(cemetery gone.Cemetery) error {

        // Bury Goners related to logging, tracing, and configuration
        _ = goner.BasePriest(cemetery)

        // Call other Priests
        _ = Priest(cemetery)
        return nil
    }
    ```

2. If logging is needed, inject it into the necessary Goners:
```go
package demo

import (
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/gin"
	"github.com/gone-io/gone/goner/logrus"
	"web-app/internal/interface/domain"
)

//go:gone
func NewDemoService() gone.Goner {
	return &demoService{}
}

type demoService struct {
	gone.Flag
	logrus.Logger `gone:"gone-logger"` // Named injection to nested anonymous property

	log logrus.Logger `gone:"gone-logger"` // Named injection to nested log property
}


func (svc *demoService) Echo(input string) (string, error) {

    // Using inherited method
	svc.Infof("input content is %s", input)

    // Using method on property
	svc.log.Infof("input content is %s", input)

	return input, nil
}
```

::: tip
When injecting built-in components, named injection should be used.
:::

## GoneId for Built-in Goners
The GonerId for built-in Goners is centrally defined in `https://github.com/gone-io/gone/blob/main/ids.go`:
```go
package gone

// ID for built-in components in the Gone framework
const (
	// IdGoneHeaven ID of the Heaven component, which represents the program itself and is automatically injected when the Gone program starts
	IdGoneHeaven = "gone-heaven"

	// IdGoneCemetery ID of the Cemetery component, which is essential for completing dependency injection and is automatically injected when the Gone program starts
	IdGoneCemetery = "gone-cemetery"

	//IdGoneTestKit ID of the TestKit component, which is injected into the program when calling gone.Test or gone.TestAt; it should not be injected into non-test code
	IdGoneTestKit = "gone-test-kit"

	// Configuration, logging, and Tracer together form the foundation of the Gone framework, and can be buried together using [goner.BasePriest](goner#BasePriest)

	//IdConfig ID of the configuration Goner, providing configuration capability
	IdConfig = "config"
	//IdGoneConfigure ID of the configurator Goner
	IdGoneConfigure = "gone-configure"
	// IdGoneTracer ID of the Tracer Goner, providing logging and tracing capabilities
	IdGoneTracer = "gone-tracer"
	// IdGoneLogger ID of the Logger Goner, used for logging
	IdGoneLogger = "gone-logger"

	//IdGoneCumx [cmux Goner](/goner/cmux#Server) ID
	IdGoneCumx = "gone-cumx"

	//IdGoneGin IDs related to Gin components, which can be buried together using [goner.GinPriest](goner#GinPriest)
	IdGoneGin          = "gone-gin"
	IdGoneGinRouter    = "gone-gin-router"
	IdGoneGinProcessor = "gone-gin-processor"
	IdGoneGinProxy     = "gone-gin-proxy"
	IdGoneGinResponser = "gone-gin-responser"

	//IdGoneXorm ID of the Xorm Goner, encapsulating xorm for database operations; can be buried using [goner.XormPriest](goner#XormPriest)
	IdGoneXorm = "gone-xorm"

	//IdGoneRedisPool ID of the redis pool Goner; Redis-related Goners can be buried using [goner.RedisPriest](goner#RedisPriest)
	IdGoneRedisPool     = "gone-redis-pool"
	IdGoneRedisCache    = "gone-redis-cache"
	IdGoneRedisKey      = "gone-redis-key"
	IdGoneRedisLocker   = "gone-redis-locker"
	IdGoneRedisProvider = "gone-redis-provider"

	// IdGoneSchedule ID of the Scheduler Goner; can be buried using [goner.SchedulePriest](goner#SchedulePriest)
	IdGoneSchedule = "gone-schedule"

	IdGoneReq = "gone-urllib"
)
```
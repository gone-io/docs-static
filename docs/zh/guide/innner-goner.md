---
sidebar: auto
---

# 如何优雅使用内置Goners?

[[toc]]

## 内置Goners

为了降低Gone的使用门槛，我们开发了一些[内置Goners](/zh/goners/#框架内置goners)，用于提供一些基础的功能。

## `Priest`函数
在gone框架内定义了`Priest`函数，在该函数里可以批量的埋葬用到的Goner；另外`Priest`函数可以嵌套，即A可以调用B，B可以调用C。那么，在我们开完一组功能后，可以提供一个`Priest`函数，将用到所有Goner批量埋葬。

实际上，在开发框架内置Goners，我们就采用这样的方式；另外为了方便调用，还在`goner/priest.go`中定义了一些快捷方式，代码如下：
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

## 如何使用

这样，我们如果要使用基本的日志、trace、配置功能，我们只需要：
1. 在主`Priest`函数中增加`gone.BasePriest(cemetery)`:
    ```go
    func MasterPriest(cemetery gone.Cemetery) error {

        // 埋葬与日志、trace和配置相关的Goners
        _ = goner.BasePriest(cemetery)

        //调用其他 Priest
        _ = Priest(cemetery)
        return nil
    }
    ```

2. 如果需要打印日志，在需要的Goner上注入
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
	logrus.Logger `gone:"gone-logger"` //具名注入到 嵌套的匿名属性上

	log logrus.Logger `gone:"gone-logger"` //具名注入到 嵌套的log属性上
}


func (svc *demoService) Echo(input string) (string, error) {

    //使用继承的方法
	svc.Infof("input content is %s", input)

    //使用属性上的方法
	svc.log.Infof("input content is %s", input)

	return input, nil
}
```

::: tip
注入内置组件，应该使用具名注入
:::

## 内置Goner的GoneId
内置Goner的GonerId，集中定义在`https://github.com/gone-io/gone/blob/main/ids.go`:
```go
package gone

// Gone框架中的内置组件ID
const (
	// IdGoneHeaven 天堂组件的ID，代码了程序本身，Gone程序启动时默认注入
	IdGoneHeaven = "gone-heaven"

	// IdGoneCemetery 坟墓组件的ID，是完成依赖注入的关键组件，Gone程序启动时默认注入
	IdGoneCemetery = "gone-cemetery"

	//IdGoneTestKit 测试箱，调用 gone.Test 或者 gone.TestAt 时，会将测试箱注入到程序；非测试代码中不应该注入该组件
	IdGoneTestKit = "gone-test-kit"

	// 配置、日志、Tracer 一起构成Gone框架的基础Goner，可以使用 [goner.BasePriest](goner#BasePriest) 牧师函数批量安葬

	//IdConfig 配置 Goner 的ID，提过能配置能力
	IdConfig = "config"
	//IdGoneConfigure 配置器 Goner 的ID
	IdGoneConfigure = "gone-configure"
	// IdGoneTracer Tracer Goner 的ID，提供日志追踪能力
	IdGoneTracer = "gone-tracer"
	// IdGoneLogger 日志 Goner 的ID，用于日志打印
	IdGoneLogger = "gone-logger"

	//IdGoneCumx [cmux Goner](/goner/cmux#Server) ID
	IdGoneCumx = "gone-cumx"

	//IdGoneGin Gin相关的组件ID，可以使用 [goner.GinPriest](goner#GinPriest) 牧师函数批量安葬
	IdGoneGin          = "gone-gin"
	IdGoneGinRouter    = "gone-gin-router"
	IdGoneGinProcessor = "gone-gin-processor"
	IdGoneGinProxy     = "gone-gin-proxy"
	IdGoneGinResponser = "gone-gin-responser"

	//IdGoneXorm Xorm Goner 的ID，封装了xorm，用于操作数据库；使用 [goner.XormPriest](goner#XormPriest) 牧师函数安葬
	IdGoneXorm = "gone-xorm"

	//IdGoneRedisPool redis pool goner; redis 相关 Goner，使用 [goner.RedisPriest](goner#RedisPriest) 牧师函数安葬
	IdGoneRedisPool     = "gone-redis-pool"
	IdGoneRedisCache    = "gone-redis-cache"
	IdGoneRedisKey      = "gone-redis-key"
	IdGoneRedisLocker   = "gone-redis-locker"
	IdGoneRedisProvider = "gone-redis-provider"

	// IdGoneSchedule 定时器Goner；使用 [goner.SchedulePriest](goner#SchedulePriest) 牧师函数安葬
	IdGoneSchedule = "gone-schedule"

	IdGoneReq = "gone-urllib"
)
```

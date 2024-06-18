---
sidebar: auto
prev: ./1_v1.x_release
next: false
---

# 注册Goner时，使用`goner.IsDefault(...)`将Goner设置为某个接口的默认实现

## 从内置组件goner/logrus的构造函数讲起
查看goner/logrus的源代码，其构造函数的代码如下：
```go
func NewLogger() (gone.Goner, gone.GonerId, gone.GonerOption) {
	log := &logger{
		Logger: logrus.StandardLogger(),
	}
	log.ResetLog()
	return log, gone.IdGoneLogger, gone.IsDefault(new(gone.Logger))
}
```
如果使用 `cemetery.Bury(NewLogger())`将Logger注册到框架，将会为`gone.Logger`接口添加一个默认实现。这是Gone v1.x加入的新特性，是为了解决按类型注入的“歧义性问题”。

在 Gone v0.x版本中，如果需要依赖`gone.Logger`接口，如果对匿名嵌入的属性进行注入只能使用具名注入：
```go
type ServiceX struct {
	gone.Flag
	gone.Logger `gone:"gone-logger"`
}
```

原因是，匿名嵌入`gone.Logger`的`ServiceX`等于实现了`gone.Logger`接口，如果再按类型匿名注入`gone.Logger`接口到`Logger`属性，可能会导致自己注入到自己的属性上。

在 Gone v1.x版本中，`NewLogger()`函数返回的`gone.GonerOption`参数中，添加了`IsDefault(new(gone.Logger))`，将`NewLogger()`函数返回的`gone.Logger`接口设置为默认实现。框架在依赖注入的装配过程中，会优先选择类型的默认实现。这样按类型注入，也能唯一指向一个实现，解决歧义性问题。

## 带来的好处
在 Gone v0.x版本中，注入组件一般都使用GonerId做具名注入；然而GonerId是不在IDE工具的提示范畴的，那么要注入内置组件必须记住组件的GonerId，增加了使用心智负担。在 Gone v1.x版本中，使用`IsDefault(...)`将Goner设置为某个接口的默认实现，可以解决这个问题。同时，框架的内置组件全部使用了`IsDefault(...)`，使用时可以放心的按类型注入:

```go
type ServiceX struct {
	gone.Flag
	gone.Logger     `gone:"*"` //注入Logger
	gone.XormEngine `gone:"*"` //注入xorm 引擎
	redis.Cache     `gone:"*"` //注入redis缓存
	// ...
}
```

## 注意gone.IsDefault的参数
**gone.IsDefault**是一个函数，返回的是一个**gone.GonerOption**，函数的功能是获取接口的类型包装为`gone.GonerOption`；接口作为golang的一种类型定义，是不能作为参数的，只能通过接口的指针间接传递类型信息。

## 注册Goner时，也可以不使用构造函数
```go

type myImplementation struct {
	gone.Flag
}
// ...
// 对myImplementation实现gone.Logger接口
//...


func Priest(cemetery gone.Cemetery) {
	cemetery.Bury(&myImplementation{}, gone.IsDefault(new(gone.Logger)))
}
```
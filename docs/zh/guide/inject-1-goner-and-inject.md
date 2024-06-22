---
sidebar: auto
prev: ./core-concept
next: ./inject-2-goner
---


# Goner 和 依赖注入
**Gone** 作为一个依赖注入框架，首先需要回答的问题：什么是依赖，如何定义依赖？

在golang中已经定义了**package**，我们在项目中引入的`package`就是一种依赖；这些依赖可以利用golang项目中的`.mod`文件进行比较好的管理，然而这种依赖也并不是我们讨论的需要注入的依赖。

**“依赖注入”**，作为一个动补短语，要明确它的含义，需要问：什么依赖了什么，谁注入了谁？

在golang中，能够承载业务逻辑的结构，只有 **`func`** 和 **`struct`**，**`func`** 的执行结果 **依赖** 函数的参数，而 **`struct`** 功能的实现 **依赖** 结构体的属性。无论是函数的参数 还是 结构体的属性，都是业务逻辑实现的 **依赖**；这样我们就回答了“什么是依赖？”：

::: tip 定义
**依赖，是为了实现某业务逻辑，函数或者结构体需要依赖的 外部值 或者 外部参数。**
:::

这些外部值或者外部参数，可能是代表了**业务**逻辑依赖的**外部业务**；实现我们的业务所需的业务逻辑，需要依赖这些外部业务来完成。由此可见，是 **业务** 依赖了 **业务**，那么注入的也是**业务**，是 **业务** 注入了 **业务** 。

为了对业务进行抽象，我们定义了`Goner`，它是一个接口，所有业务结构体都要实现它；那么，在Gone框架中，就是 **Goners依赖Goners，Goners注入到Goners**。


## Goner的定义
我们查看[Goner](https://github.com/gone-io/gone/blob/main/interface.go#L13)的定义，如下：
```go
type Goner interface {
	goneFlag()
}
```
可以看到，Goner是一个接口，要求实现一个私有方法`goneFlag()`，这个方法是为了标识该结构体是Goner。由于golang语法限制，在包外部是无法实现一个包内的私有方法的，为了在外部的业务代码可以实现 **Goner接口** ，我们又定义了`gone.Flag`结构体，并且在实现了`goneFlag()`方法时将方法的接收者设置了为 **Flag指针**，如下：
```go
type Flag struct{}

func (g *Flag) goneFlag() {}
```
这样，业务结构体`XBusiness` **有且仅有** 匿名嵌入`gone.Flag`才能完成对Goner接口的实现。gone框架要求只有Goner才可以被注册到Gone框架中，用于依赖注入的装配。
例如：
```go
package example

import "github.com/gone-io/gone"

type XBusiness struct {
	gone.Flag
}
```
这样设计的好处是：
1. 限定依赖注入装配的对象都是Goner，可以简化了依赖注入装配流程实现。
2. 限定Goner一定是指针，依赖注入时可以避免结构体的值拷贝；一方面是提高性能，另一方面是避免值拷贝时的“浅拷贝”业务对象带来的未知问题。


## 依赖标记
业务结构体中，并不是所有的属性都需要依赖注入，需要有一种机制标记哪些属性需要使用依赖注入。为此，我们设计了标签`gone`来标记需要注入的属性，如下：
```go
type Employee interface {
	Work()
}

type Company struct {
	gone.Flag

	Boss Employee `gone:"*"` // 标记需要依赖注入的属性
}
```
公司需要注入一个员工作为Boss，星号(*)表示该属性的注入只需要匹配类型，即实现 Employee 接口的Goner就可以；这种注入方式，我们称为**匿名注入**。

::: warning 需要注意
Goner 结构体需要注入的属性，可以是任意 接口 或者 结构体指针，这里并不限定是Goner，只有Goner注册到Gone框架时限定Goner类型。
:::

公司的老板不可能是任何员工都能担任的，与**匿名注入**对应的就是**具名注入**，注入标签可以将星号替换为需要注入Goner的Id 字符串，如下：
```go
type Company struct {
	gone.Flag

	Boss Employee `gone:"boss"` // 具名注入，要求该属性注入一个Id=boss的Goner
}
```

## Goners 注册
为了完成依赖注入的自动装配，我们需要将所有的Goners注册到Gone框架中。下面给出上面公司依赖员工这个例子的完整代码，如下：
```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
)

type Employee interface {
	Work()
	Name() string
}

type Company struct {
	gone.Flag

	Boss Employee `gone:"boss"` // 标记需要依赖注入的属性
}

func (c *Company) Start() {
	fmt.Printf("Company start, boss is %s\n", c.Boss.Name())
	c.Boss.Work()
}

type EmployeeImpl struct {
	gone.Flag
	name string
}

func (e *EmployeeImpl) Work() {
	fmt.Printf("I am working, my name is %s\n", e.Name())
}

func (e *EmployeeImpl) Name() string {
	return e.name
}

func main() {
	gone.
		Prepare(func(cemetery gone.Cemetery) error {
			//注册EmployeeImpl
			cemetery.Bury(&EmployeeImpl{name: "Scott"}, gone.GonerId("boss"))

			//注册Company
			cemetery.Bury(&Company{})

			return nil
		}).
		Run(func(company *Company) {
			company.Start()
		})
}
```
可以看到，我们使用了`cemetery.Bury` 方法完成了Goner到Gone框架的注册；该方法第二参数可以指定被注册的Goner的Id，如果没有指定Id，Gone框架会自动为Goner随机生成一个Id。在**具名注入**时，我们会用到注册时的GonerId来作为gone标签的值。

## Priest函数
在上面代码中，`gone.Prepare` 方法接收的参数为一个匿名函数，它的形式如下：
```go
func(cemetery Cemetery) error
```

在Gone框架中，这样形式的函数被定义为**Priest**函数，专门负责Goners的注册。

::: tip Priest的定义
```go
type Priest func(cemetery Cemetery) error
```
:::

大多数情况下，我们可以不用手动编写Priest代码；在gone中提供了 [gone辅助工具](https://goner.fun/zh/references/gone-tool.html)，可以为我们自动生成Priest函数代码：[自动生成Priest
](https://goner.fun/zh/guide/auto-gen-priest.html)
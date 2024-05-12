---
sidebar: auto
---

# Gone的核心概念
“我们编写的代码，终究只是死物，除非他在**天国**被**复活**，为此我们需要将他**埋葬**在**墓园**。”

[[toc]]

## Goner（逝者）
在Gone框架中，最基本的和最核心的概念就是 Goner，**Goner 是指的匿名嵌入了 `gone.Flag` 的结构体**。举个例子：
```go
type Worker struct {
	gone.Flag
}
```

Goner是Gone框架中的组件，是实现依赖注入的关键：
1. Goner可以作为属性被注入到其他结构体
2. Goner的属性可以被其他类型注入


为什么需要内嵌一个 `gone.Flag`？是因为我们希望限制依赖注入的范围，让依赖注入只发生在Goners之间，让Gone框架的组件实现有一个统一的模式。

::: tip
下面是Goner和gone.Flag的源代码：
```go
type Flag struct{}

func (g *Flag) goneFlag() {}

//...


// Goner 逝者
type Goner interface {
	goneFlag()
}
```
Goner作为接口，要求实现它的“对象”拥有一个私有的方法`goneFlag()`；由于go语言可见性的限制，不能在`github.com/gone-io/gone`以外的包中实现其内部定义的私有方法；一个结构体要成为Goner，只能通过内嵌`gone.Flag`才能“继承”私有的方法`goneFlag()`。这段话可能有些不好理解，其实就是说Goner的实现只能通过内嵌gone.Flag来完成，不能通过实现`goneFlag()`方法来完成。
:::

::: tip
多个**Goner**，我们使用其复数形式（**Goners**）表示。
:::

在Gone框架中，还包含了三类特殊的Goner，定义如下：


### 🔮Prophet（先知）
一种特殊的 **Goner**，在普通 **Goner** 上实现了 **`AfterRevive() AfterReviveError`** 方法就是 **Prophet（先知）**；**AfterRevive** 会在 **Goner** 被复活后被执行。

Prophet接口定义如下：
```go
// Prophet  先知
type Prophet interface {
	Goner
	//AfterRevive 在Goner复活后会被执行
	AfterRevive() AfterReviveError
}
```

### 😇Angel（天使）
一种特殊的 **Goner**，拥有天使左翼`Start(Cemetery) error` 和 天使右翼`Stop(Cemetery) error`，左翼负责生（用于分配资源，启动某项服务），右翼负责死（用于终止某项服务，回收资源）。

Angel接口定义如下：
```go
type Angel interface {
	Goner
	Start(Cemetery) error
	Stop(Cemetery) error
}
```

### 🧛🏻‍♀️Vampire（吸血鬼）
一种特殊的 **Goner**，拥有特殊能力——吸血`Suck(conf string, v reflect.Value) SuckError`。**Suck**可以将不是**Goner**的值赋予注入给Goner属性。

Vampire接口定义如下：
```go
type SuckError error
type Vampire interface {
	Goner
	Suck(conf string, v reflect.Value) SuckError
}
```


## Cemetery（墓园）
Cemetery用于管理Goners，主要提供Bury（埋葬）和 revive（复活）的方法，其接口定义如下：
```go
type Cemetery interface {
	// ... 其他方法
	Goner
	Bury(Goner, ...GonerId) Cemetery  // 埋葬，将逝者埋葬到墓园



	//ReviveAllFromTombs 复活所有Goner
	ReviveAllFromTombs() error

	//...
}
```
从代码上可以看到Cemetery本身也是一个Goner，在Gone框架启动时他会被自动埋葬和复活。

### Bury（埋葬）
将Goner **埋葬** 到 **Cemetery** 就是将Goner注册到框架，以待后续完成属性的注入；在代码实现上，**Bury**是**Cemetery**上的公开方法，一般在通过 **Priest** 函数调用该方法。

### Revive（复活）
Revive（复活）指的是Goner所有需要注入的属性完成注入的过程。在函数`ReviveAllFromTombs() error`中，所有被**埋葬**到**Cemetery**的Goners都会被尝试复活，如果有属性不能正常注入，程序将panic。
::: tip
**ReviveAllFromTombs**在完成了复活所有的**Goners**后，会调用所有**Prophet**的 **AfterRevive**方法。
:::


## Heaven（天国）
Heaven（天国）代表了一个Gone程序，用于管理程序的启动、停止等状态和流程（复活在启动前完成），用于在启动前后以及程序停止前执行一些hook任务。Heaven接收一个牧师函数开始运行，例如：
```go
package main

import "github.com/gone-io/gone"

func Priest(cemetery gone.Cemetery) error {
	// 调用 cemetery.Bury 埋葬 Goner
	// 或者 调用其他 Priest 函数
	// TODO
	return nil
}

func main(){
	gone.Run(Priest)
}
```

或者：
```go
package main

import "github.com/gone-io/gone"

func Priest(cemetery gone.Cemetery) error {
	// 调用 cemetery.Bury 埋葬 Goner
	// 或者 调用其他 Priest 函数
	// TODO
	return nil
}

func main(){
	gone.
		Prepare(Priest).
		AfterStart(func(){
			//TODO: 启动后执行一些操作
		}).
		Run()
}
```

## Priest (牧师)
Priest (牧师)是负责将**Goner**埋葬到**Cemetery**的函数，他的定义如下：
```go
type Priest func(cemetery Cemetery) error
```

在**Priest**函数实现上，可以调用 **cemetery.Bury** 来完成，如下：
```go
type Worker struct {
	gone.Flag
	Name string
}

type Boss struct {
	gone.Flag

	Name string
}

func aPriest(cemetery gone.Cemetery) error {
	cemetery.Bury(&Boss{Name: "Jim"}, "boss-jim")
	cemetery.Bury(&Worker{Name: "Bob"}, "worker-bob")

	//匿名埋葬，不指定被埋葬Goner的GonerId
	cemetery.Bury(&Worker{Name: "X"})
	return nil
}
//...
```
也可以通过调用其他的**Priest**函数来完成：
```go
func a1Priest(cemetery gone.Cemetery) error {

	//todo
	return nil
}

func a2Priest(cemetery gone.Cemetery) error {

	//todo
	return nil
}

func aPriest(cemetery gone.Cemetery) error {
	_ = a1Priest(cemetery)
	_ = a2Priest(cemetery)

	//todo
	return nil
}
```
如果我们开发了一个组件包，其中使用了多个**Goners**来完成响应的功能，使用时需要同时**埋葬**这些**Goners**，那么我们可以编写一个**Priest**函数方便业务代码批量**埋葬**这些**Goners**。

框架内置的组件包，我们就是这样干的，[代码](https://github.com/gone-io/gone/blob/main/goner/priest.go) 和 [文档](https://goner.fun/zh/goners/#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AEgoners)。

另外，我们开发了一个命令行辅助工具**gone**，用于扫描特殊注释`//go:gone`自动生成牧师函数，参考[自动生成Priest](./auto-gen-priest.md)。
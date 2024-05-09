---
sidebar: auto
---

# Gone的核心概念
“我们编写的代码，终究只是死物，除非他在**天国**被**复活**，为此我们需要将他**埋葬**在**墓园**。”


## Goner（逝者）
在Gone框架中，最基本的定义和最核心的概念就是 Goner，**Goner 是指的匿名嵌入了 `gone.Flag` 的结构体**。举个例子：
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
	revive() error // 复活，对逝者进行复活，让他们升入天堂
}
```
从代码上可以看到Cemetery本身也是一个Goner，在Gone框架启动时他会被自动埋葬和复活。

### Bury（埋葬）
Cemetery上的公开方法，通过这个方法，Priest函数可以将Goner埋葬到墓园（就是将组件放到依赖注入系统用于注入或者被注入）。

### revive（复活）
在gone中，依赖注入的具体工程被称为复活，即对一个Goner上需要注入的属性完整组装，将对应的值赋给对应的属性。revive（复活）被定义一个私有方法，只能被Heaven（天国）调用，因为复活是在天国下完成的。


## Heaven（天国）
Heaven（天国）代表了一个Gone程序，用于管理程序的启动、停止等状态和流程（复活在启动前完成），用于在启动前后以及程序停止前执行一些hook任务。
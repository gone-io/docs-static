---
sidebar: auto
prev: ./
next: ./inject-1-goner-and-inject.md
---

# Gone的核心概念
> “我们编写的代码，终究只是死物，除非他在 **天国（程序）** 被 **复活（对Goners完成依赖的装配）**，为此我们需要将他 **埋葬（注册）** 在 **墓园（Gone内部的Goners仓库）**。”

[[toc]]

## Goner

**Goner** 是指实现了 `gone.Goner` 接口的结构体实例指针；只有实现了`gone.Goner`接口的实例才能被注册到Gone中；实现`Goner`接口 有且只有 通过嵌入 **`gone.Flag`** 来实现。

举个例子，下面的worker就是一个goner：
```go
type Worker struct {
	gone.Flag
}

worker := &Worker{}
```

Goner是Gone的组件，是实现依赖注入的关键：
1. Goner可以作为值被注入到其Goner的属性；
2. Goner的属性可以被其Goners注入。




::: tip 为什么只能内嵌 `gone.Flag`实现**Goner**接口？
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




## 特殊Goners


### 🔮Prophet（先知，率先知道装配完成）
一种特殊的 **Goner**，在普通 **Goner** 上实现了 **`AfterRevive() AfterReviveError`** 方法就是 **Prophet（先知）**；**AfterRevive** 会在所有 **Goners** 都完成依赖注入装配流程后被执行。

Prophet接口定义如下：
```go
// Prophet  先知
type Prophet interface {
	Goner
	//AfterRevive 在所有Goners装配完后会被执行
	AfterRevive() error
}
```

### 😇Angel（天使，看护开始和结束）
一种特殊的 **Goner**，拥有天使左翼`Start(Cemetery) error` 和 天使右翼`Stop(Cemetery) error`，左翼负责开始（用于分配资源，启动某项服务），右翼负责结束（用于终止某项服务，回收资源）。

Angel接口定义如下：
```go
type Angel interface {
	Goner
	Start(Cemetery) error
	Stop(Cemetery) error
}
```

### 🧛🏻‍♀️Vampire（吸血鬼，扩展注入类型）

一种特殊的 **Goner**，拥有特殊能力——“吸血”`Suck(conf string, v reflect.Value) SuckError`。**Suck**可以将不是**Goner**的值赋予注入给Goner属性。

Vampire接口定义如下：
```go
type SuckError error
type Vampire interface {
	Goner
	Suck(conf string, v reflect.Value) SuckError
}
```


## Cemetery（Goners仓库）

Cemetery用于管理Goners，主要提供Bury（注册）和 revive（装配）的方法，其接口定义如下：
```go
type Cemetery interface {
	// ... 其他方法
	Goner
	Bury(Goner, ...GonerId) Cemetery  // 将Goner注册到框架



	//ReviveAllFromTombs 装配所有Goner
	ReviveAllFromTombs() error

	//...
}
```
从代码上可以看到Cemetery本身也是一个Goner，在Gone框架启动时他自己也注册到Cemetery中。

### Bury（注册）

将Goner **注册** 到 **Cemetery（goners仓库）** 就是将Goner注册到框架，以待装配流程完成属性的注入；在代码实现上，**Bury**是**Cemetery**上的公开方法，一般在通过 **Priest** 函数调用该方法。

### Revive（装配）
Revive（装配）指的是Goner所有需要注入的属性完成依赖装配的过程。在函数`ReviveAllFromTombs() error`中，尝试装配所有被注册的Goners，如果存在属性不能正常注入，程序将抛出panic。

::: tip
**ReviveAllFromTombs**在完成了装配所有的**Goners**后，会调用所有**Prophet**的 **AfterRevive**方法。
:::


## Heaven
Heaven（天国）代表了一个Gone程序，用于管理程序的启动、停止等状态和流程（装配在启动前完成），用于在启动前后以及程序停止前执行一些hook任务。Heaven接收一个牧师函数开始运行，例如：

```go
package main

import "github.com/gone-io/gone"

func Priest(cemetery gone.Cemetery) error {
	// 调用 cemetery.Bury 注册 Goner
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
	// 调用 cemetery.Bury 注册 Goner
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

## Priest (批量注册Goners)

Priest (牧师)是负责将**Goner**注册到Gone的函数，他的定义如下：
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

	//匿名注册，不指定被注册Goner的GonerId
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

如果开发了一个组件包使用了多个**Goners**来实现相应的功能；使用时需要同时注册多个Goners，可能不是那么方便；为了方便用户使用我们开发的包，可以编写一个**Priest**函数批量注册Goners。

Gone内置的组件包，我们就是这样做的，可以参考[代码](https://github.com/gone-io/gone/blob/main/goner/priest.go) 和 [文档](https://goner.fun/zh/goners/#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AEgoners)。

另外，我们开发了一个命令行辅助工具 **[gone](https://goner.fun/zh/references/gone-tool.html)**，用于扫描特殊注释`//go:gone`自动生成牧师函数，参考 [自动生成Priest](./auto-gen-priest.md)。

## 总结
在Gone中，组件叫`Goner`（逝者），称为Goner需要嵌入`gone.Flag`（死亡标记），Goner被注册（埋在）到 `Cemetery`（墓园）中；Gone启动时，自动装配（Revive）所有Goners，建立一个天国（Gone程序），在天国中有先知、天使和吸血鬼。

是不是很有意思呢？
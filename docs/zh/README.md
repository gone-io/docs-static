# Gone 框架指南

## Gone是什么
Gone是一个为熟悉Spring的程序员设计的Golang框架，它整合了依赖注入和Web功能，使得在Golang中的应用程序管理和开发更加方便。该框架定义了像“Goners”（组件）、“Cemetery”（存储）和“Heaven”（运行状态）等概念，每一个都在生命周期管理和依赖处理中发挥着独特的作用。它支持依赖注入、服务生命周期管理和动态属性注入等功能，以改善开发体验。

## 为什么需要使用Gone
使用Gone框架可以带来几个重要好处，特别是对于熟悉Spring框架的Golang开发者：

- 依赖注入：Gone提供了类似Spring的依赖注入功能，让管理和配置组件变得更简单，提高了代码的模块化和可重用性。
- 服务生命周期管理：框架管理服务的整个生命周期，帮助开发者有效控制服务的创建、使用和销毁过程。
- 开发效率：通过简化配置和自动化常见任务，Gone可以加快开发速度，减少重复性工作。
- 扩展性和灵活性：Gone设计了灵活的结构，支持定制和扩展，适应不同的开发需求。

这些特性使得Gone成为一个适合快速开发高质量Golang应用程序的框架。

## Goner和依赖注入
### Goner的定义
在Gone应用中，所有的组件都被要求定义为Goner（就是“继承”了`gone.Flag`的结构体，实际上golang中根本没有“集成”这个概念，它有的只有匿名嵌套）；如果Goner的某个属性标注了`gone:""`标签，Gone框架将尝试自动装配该属性。下面是定义一个Goner的例子：
```go
package example

import "github.com/gone-io/gone"

type AGoner struct {
	gone.Flag
}
```
在另一个Goner中注入上面定义的AGoner:
```go
package example

import "github.com/gone-io/gone"

type BGoner struct{
    gone.Flag
    A *AGoner `gone:"*"` //gone标签的作用在于告诉Gone，该属性需要被自动注入一个值
}
```
其中，注入的和被注入的结构体都要求是`Goner`（也就是匿名嵌套了`gone.Flag`的结构体），`BGoner`的`A`属性的`gone:"*"`标签的作用在于告诉框架：这个属性需要被注入一个值。

### 在Gone中是如何完成依赖注入的？
在Java Spring中，给class打上`@Component`、`@Service`等标注，Spring启动时会自动扫描到这些特殊的类，然后实例化他们并且给他们有特定标注的属性注入对应的值。

Spring之所以能够实现这样的功能，Java有一个特性很关键，就是Java代码在编译成jar后，会保留所有class的字节码，哪怕是没有被`main`函数依赖的class代码；然而，在Golang中，编译后的代码会被裁剪，二进制文件中只会保留`main`函数依赖的相关代码。所以我们仅是定义Goner，在编译后我们会发现我们Goner代码全部被裁剪了。

如何让我们的**Goners**不被裁剪掉呢？答案很简单，我们显式的将所有Goner加入到一个”仓库“中；在Gone中，这个仓库叫做`Cemetery`。`Goner`有“死者”的意思；`Cemetery`是墓地，用于埋葬（Bury）`Goner`。我们可以在程序启动时，将所有的**Goner**实例化后并加入到**Cemetery**中：
```go
package main

import "example"
import "github.com/gone-io/gone"

func main() {
	gone.Run(func(cemetery gone.Cemetery) error {
        cemetery.Bury(&example.AGoner{})
		cemetery.Bury(&example.BGoner{})
        return nil
	})
}
```

在上面的代码中，我们看到`gone.Run`可以接收形式如 **`func (cemetery gone.Cemetery) error`** 的函数；实际上这个函数，我们称之为 **Priest**，是牧师的意思，他专门负责将 **Goner** 埋葬到 墓地（**Cemetery**）。


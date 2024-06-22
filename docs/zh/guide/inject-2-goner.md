---
sidebar: auto
prev: ./inject-1-goner-and-inject.md
next: ./inject-3-func.md
---

# 依赖注入方式

[[toc]]

为了区分结构体属性是否需要依赖注入，我们引入一个标签——`gone`，拥有`gone`标签的属性将在Gone启动过程中被注入需要的依赖。

## 支持的属性类型

### 值类型
结构体的属性为某个机构体的值类型，如下面代码中的`Boss.Seller`：
```go
type Worker struct {
	gone.Flag
	Name      string
}

type Boss struct {
    gone.Flag
    Seller  Worker `gone:"*"`  //值类型
}
```


::: warning 注意：不推荐使用值类型做注入
“**值类型** 的赋值和传参都是传递的拷贝”，这意味着我们如果使用 **值类型** 注入时，实际上产生了一个新的“对象”，新分配了一块内存，并且新旧对象只有在“传递那一刻”是相等，他们在内存中是独立的；这可能导致一些不符合“直觉”的结果，举个例子：

```go
type BGoner struct {
	gone.Flag

	a1 AGoner  `gone:"A1"` // 值注入
	a2 AGoner  `gone:"A1"` // 值注入
}

func (g *BGoner) AfterRevive() gone.AfterReviveError {
	g.a1.Name = "dapeng"
	g.a2.Name = "wang"

	fmt.Printf("a1 is eq a2: %v", g.a1 == g.a2)

	return nil
}

```
在上面的代码中，打印的结果会是 `false`。
:::


### 指针类型
接收注入的结构体属性是另一个结构体的指针，如下面代码的`Boss.Seller`的类型为 `*Worker`:
```go
type Worker struct {
	gone.Flag
	Name      string
}

type Boss struct {
    gone.Flag
    Seller  *Worker `gone:"*"`  //指针类型
}
```

### 接口类型
接收注入的结构体属性是一个接口，如下面代码的`Boss.Seller`的类型为 `Seller`，Gone会从注册的Goners中查找实现了`Seller`接口的Goner赋值给`Boss.Seller`。
```go
type Seller interface {
    Sell() error
}

type Boss struct {
    gone.Flag
    Seller Seller `gone:"*"`  //接口类型
}
```


### slice 类型
接收注入的结构体属性还可以是 slice 类型，slice 的元素类型允许为 值类型（由于值拷贝，不推荐使用）、指针类型 和 接口类型，如下代码中的`Boss.Sellers`、`Boss.Workers`、`Boss.Persons`，Gone会尝试间类型兼容的所有goners添加到slice中。

```go
type Worker struct {
	gone.Flag
	Name      string
}

type Seller interface {
    Sell() error
}

type Boss struct {
    gone.Flag
    Sellers []Seller  `gone:"*"`  //Slice 类型，元素为接口类型
    Workers []*Worker `gone:"*"`   //Slice 类型，元素为指针类型
    Persons []Worker  `gone:"*"`   //Slice 类型，元素为值类型
}
```

### map 类型
接收注入的结构体属性还可以是 map 类型，map 的元素类型允许为 值类型（由于值拷贝，不推荐使用）、指针类型 和 接口类型。map 的 key 只能被定义为`string`类型，被注入后map key 的值为 GonerId（后面介绍什么是GonerId）。

**举个例子**
```go
type Worker struct {
	gone.Flag
	Name      string
}

type Seller interface {
    Sell() error
}

type Boss struct {
    gone.Flag
    Sellers map[string]Seller  `gone:"*"`  //Map 类型，元素为接口类型
    Workers map[string]*Worker `gone:"*"`   //Map 类型，元素为指针类型
    Persons map[string]Worker  `gone:"*"`   //Map 类型，元素为值类型
}
```

## GonerId 和 具名注入
### GonerId
Goner注册到Gone框架，支持传递一个可选参数**GonerId**，如果不传也会随机生成一个，如下：
```go
type Worker struct {
	gone.Flag
	Name      string
}

type Seller interface {
    Sell() error
}

type Boss struct {
    gone.Flag
    Sellers map[string]Seller  `gone:"*"`  //Map 类型，元素为接口类型
    Workers map[string]*Worker `gone:"*"`   //Map 类型，元素为指针类型
    Persons map[string]Worker  `gone:"*"`   //Map 类型，元素为值类型
}


func Priest(cemetery gone.Cemetery) error {
	cemetery.
		Bury(&Worker{}, gone.GonerId("worker-01")). //注册；使用worker-01做GonerId
		Bury(&Worker{}, gone.GonerId("worker-02")). //注册；使用worker-02做GonerId
		Bury(&Boss{}) //匿名注册，不关心GonerId是什么
	return nil
}
```
### 具名注入
前面的例子中，依赖注入标记`gone`的值都是`*`，意思让Gone自动寻找或者构建兼容的类型完成注入，我们称之为 **匿名注入**。另外，Gone支持在`gone`标签赋予一个值作为GonerId，要求Gone查找特定GonerId的Goner完成依赖注入，也就是 **具名注入**。

如下面代码中，`Boss.Manager`的注入，Gone会自动寻找GonerId为`worker-01`的Goner，完成注入。
```go
type Boss struct {
	gone.Flag
	Manager *Worker `gone:"worker-01"` //具名注入
}
```

## 私有属性注入
前面的例子中，所有的属性都是 **共有属性** （又称Exported，是大写字母打头的，在包外部可以访问的）；Gone实际是支持在私有属性上完成依赖注入的，如下：
```go
type Boss struct {
	gone.Flag
	manager *Worker `gone:"worker-01"` //manager为私有属性也是可以的
}
```

我们**推荐使用私有属性注入**，因为被依赖注入的“对象”一般仅限于内部使用，使用私有属性注入，可以减少代码的耦合度，提高代码的可维护性。

## 其他注入方式

### 函数参数注入
Gone还支持对函数的参数进行依赖注入，[函数参数注入](https://goner.fun/zh/guide/inject-3-func.html)

### 配置参数注入
配置参数的注入，是用内置组件[goner/config](https://goner.fun/zh/guide/goner-config.html)实现的。

### HTTP请求参数注入
HTTP请求参数的注入，是指在处理HTTP请求时，将请求的相关参数注入到处理函数的参数上，这部分功能由内置组件[goner/gin](https://goner.fun/zh/guide/goner-gin.html)实现。
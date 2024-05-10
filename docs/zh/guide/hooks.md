---
sidebar: auto
---

# Gone的Hook函数

## 什么是Hook函数
在Gone的启停过程中，支持注册4种类型的函数，这个些函数会在特定时机被执行，被称为Hook函数。
- BeforeStart Hook函数，在Gone启动前执行，通过`BeforeStart`注册
- AfterStart Hook函数，在Gone启动后执行，通过`AfterStart`注册
- BeforeStop Hook函数，在Gone停止前执行，通过`BeforeStop`注册
- AfterStop Hook函数，在Gone停止后执行，通过`AfterStop`注册

## 看一段代码

```go
package main

import "github.com/gone-io/gone"

type Worker struct {
	gone.Flag
	Name string
}

type Boss struct {
	gone.Flag

	Name string
}

func main() {
	gone.
		Prepare(func(cemetery gone.Cemetery) error {
			cemetery.Bury(&Boss{Name: "Jim"}, "boss-jim")
			cemetery.Bury(&Worker{Name: "Bob"}, "worker-bob")
			return nil
		}).
		BeforeStart(func() {
			println("第1个 BeforeStart 函数")

		}).
		BeforeStart(func(in struct {
			worker Worker `gone:"worker-bob"`
			boss   Boss   `gone:"*"`
		}) {
			println("第2个 BeforeStart 函数")
			println("boss:", in.boss.Name)
			println("worker:", in.worker.Name)
		}).
		BeforeStart(func() error {
			println("第3个 BeforeStart 函数")

			return nil
		}).
		Run()
}
```
上面代码代码的执行结果如下：
```
第3个 BeforeStart 函数
第2个 BeforeStart 函数
boss: Jim
worker: Bob
第1个 BeforeStart 函数
```

### Hook函数遵循以下规则
1. 同一种类型的Hook函数可以多次注册；
2. `BeforeStart` 和  `BeforeStop` Hook 函数，先注册的后执行；
3. `AfterStart` 和  `AfterStop` Hook 函数，先注册的先执行；
4. 通过`gone.Prepare(priest)`返回的`Preparer`对象注册Hook 函数，支持链式调用；
5. `Preparer`对象注册Hook 函数，函数支持多种类型：
	- **入参**
    	- 无参数
    	- 匿名结构体参数，属性设置`gone`标签会被自动注入响应的值
	- **出参**
    	- 无出参
    	- error参数，如果error参数不为`nil`，程序执行到该Hook时会抛出`panic`,终止运行

## Gone的启动流程

1. [复活](core-concept.html#revive-复活)所有**埋葬**的Goners
2. 执行所有先知Goners的`AfterRevive`方法
3. 将**天使**的`Start`方法注册为BeforeStart Hook函数；将**天使**的`Stop`方法注册为BeforeStop Hook 函数；
4. 业务代码注册 Hook 函数
5. 按顺序执行 BeforeStart Hook 函数
6. 按顺序执行 AfterStart Hook 函数
7. 等待程序结束
8. 按顺序执行BeforeStop Hook 函数
9. 按顺序执行AfterStop Hook 函数
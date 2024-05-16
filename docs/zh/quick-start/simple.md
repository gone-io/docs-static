---
sidebar: auto
prev: false
next: ./web
---

# 一个极简例子

代码如下：
```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
)

type Worker struct {
	gone.Flag // Goner标志，匿名内嵌`gone.Flag`表示该结构体为一个Goner
}

func (w *Worker) Do() {
	fmt.Println("worker do")
}

type Boss struct {
	gone.Flag // Goner标志，匿名内嵌`gone.Flag`表示该结构体为一个Goner

	seller *Worker `gone:"*"` //注入Worker
}

func (b *Boss) Do() {
	fmt.Println("boss do")
	b.seller.Do()
}

func main() {
	gone.
		Prepare(func(cemetery gone.Cemetery) error {
			cemetery.
				Bury(&Boss{}).
				Bury(&Worker{})
			return nil
		}).
		//AfterStart 是一个hook函数，关于hook函数请参考文档：https://goner.fun/zh/guide/hooks.html
		AfterStart(func(in struct {
			boss *Boss `gone:"*"` //注入Boss
		}) {
			in.boss.Do()
		}).
		Run()
}
```
在这个例子中，在Gone的准备阶段，通过[**埋葬**](http://localhost:8080/zh/guide/core-concept.html#bury-%E5%9F%8B%E8%91%AC)的方式将 Boss 和 Worker 导入到框架。在框架启动后，老板开始工作`in.boss.Do()`；老板工作中调用销售开始工作`b.seller.Do()`。
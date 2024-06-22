---
sidebar: auto
prev: ../quick-start/
next: ./
---

# 一个极简例子

## 代码
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
			// 注册Worker和Boss到框架
			cemetery.Bury(&Boss{}).Bury(&Worker{})
			return nil
		}).
		Run(func(in struct {
			boss *Boss `gone:"*"` //注入Boss
		}) {
			in.boss.Do()
		})
}
```

## 讲解
在这个例子中，在Gone的准备阶段（Prepare函数中），通过[**cemetery.Bury**](https://goner.fun/zh/guide/core-concept.html#bury-%E5%9F%8B%E8%91%AC) 将 `Boss` 和 `Worker` 注册到Gone；Run调用的方法中，依赖注入了 `Boss`，`Boss`依赖注入了 `Worker`；。Gone启动后，“老板”开始工作`in.boss.Do()`；“老板”工作中调用“销售员”开始工作`b.seller.Do()`。


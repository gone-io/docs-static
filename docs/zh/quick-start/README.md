---
sidebar: auto
---

# 快速开始

## 安装gone辅助工具
```bash
go install github.com/gone-io/gone/tools/gone@latest
```

> 安装可以使用gone命令：
> ```bash
> gone -h
> ```
> ![gone 命令结果](../../img/image3.png)
> 支持的功能：
> 1. create，创建一个gone app，暂时只支持创建web app
> 2. priest，为项目自动生成 **Priest** 函数，[了解更多](../)
> 3. 生成用于测试的mock代码

## 创建一个web项目并运行代码

```bash
# 创将一个名为 web-app 的项目
gone create web-app
cd web-app
make run
```
## 项目结构
![项目结构](../../img/image4.png)

- cmd/server/main.go: 启动文件，main函数所在文件
- config/: 项目配置文件目录，支持`.properties`文件
- internal/router/: 在该目录定义路由器
- internal/middleware/: 中间件目录，如果需要定义web中间件，在该目录编写
- internal/controller/: controller目录，在该目录中的文件定义路由
- internal/interface/service/: 该目录放服务的接口定义
- internal/domain/: 该目录放领域对象
- internal/entity/: 该目录放一些无逻辑的结构体，类似于Java 的POJO
- internal/module/: 模块目录，下面的每一个子目录实现一个模块的功能，一般是internal/interface/service/中定义的服务的业务实现；
- internal/pkg/: 在该目录可以放一些项目共用的工具代码
- internal/master.go: 存放**MasterPriest**函数
- internal/priest.go: gone priest 命令生成的 **Priest**函数，用于**埋葬**所有Goner

## Router
在目录`internal/router`中分别定义了两个`gin.IRouter`:
- pubRouter，公开的路由，挂载在该路由下的接口，请求将无需授权即可访问。
- authRouter，鉴权的路由，挂载在该路由下的接口，请求必须先要经过授权。

我们来分析`internal/router/pub_router.go`的代码：
```go
package router

import (
	"web-app/internal/middleware"
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/gin"
)

const IdAuthRouter = "router-auth"

//go:gone
func NewAuth() (gone.Goner, gone.GonerId) {
	return &authRouter{}, IdAuthRouter
}

type authRouter struct {
	gone.Flag
	gin.IRouter
	root gin.IRouter `gone:"gone-gin-router"`

	auth *middleware.AuthorizeMiddleware `gone:"*"`
	pub  *middleware.PubMiddleware       `gone:"*"`
}

func (r *authRouter) AfterRevive() gone.AfterReviveError {
	r.IRouter = r.root.Group("/api", r.pub.Next, r.auth.Next)
	return nil
}
```


## Controller

## Service

## 数据库


## 服务启动流程
![启动流程](../../img/image5.png)

服务的启动从 **gone.Serve** 开始，该函数可以接收一个或者多个**Priest**函数，**Priest**函数负责将 **Goners**“埋葬**Bury**”到**Cemetery**。**gone.Serve**在所有的**Goners**复活后，等待系统信号，主goroutine将阻塞，具体的业务留给**Angel**通过**Start**方法开启新的goroutine来完成。
在**Gone**中，几乎所有的组件（包括内置的组件）都是**Goner**。
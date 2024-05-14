---
sidebar: auto
prev: false
next: ./mysql
---

# Creating a Simple Web Project

## Installing the Gone Utility Tool
```bash
go install github.com/gone-io/gone/tools/gone@latest
```

> After installation, you can use the gone command:
> ```bash
> gone -h
> ```
>
> ```bash
>	➜  demo gone -h
>	NAME:
>	gone - A new cli application
>
>	USAGE:
>	gone [global options] command [command options] [arguments...]
>
>	DESCRIPTION:
>	generate gone code or generate gone app
>
>	COMMANDS:
>	priest   -s ${scanPackageDir} -p ${pkgName} -f ${funcName} -o ${outputFilePath} [-w]
>	mock     -f ${fromGoFile} -o ${outGoFile}
>	create   [-t ${template} [-m ${modName}]] ${appName}
>	help, h  Shows a list of commands or help for one command
>
>	GLOBAL OPTIONS:
>	--help, -h  show help (default: false)
> ```
> Supported functionalities:
> 1. create: Create a Gone app, currently only supports creating web apps.
> 2. priest: Automatically generate the **Priest** function for the project. [Learn More](../)
> 3. Generating mock code for testing.

## Creating a Web Project and Running the Code

```bash
# Create a project named web-app
gone create web-app
cd web-app
make run
```


## Project Structure

```bash
├── Dockerfile
├── Makefile
├── README.md
├── cmd
│   └── server
│       └── main.go // Startup file, containing the main function.
├── config          // Project configuration directory, supporting `.properties` files.
│   ├── default.properties
│   ├── dev.properties
│   ├── local.properties
│   └── prod.properties
├── docker-compose.yaml
├── go.mod
├── internal
│   ├── controller     // Controller directory, for defining routes in files.
│   │   └── demo_ctr.go
│   ├── interface
│   │   ├── domain    // Directory for domain objects.
│   │   │   ├── demo.go
│   │   │   └── user.go
│   │   └── service  // Directory for service interface definitions.
│   │       └── i_demo.go
│   ├── master.go
│   ├── middleware      // Middleware directory, for defining web middleware.
│   │   ├── authorize.go
│   │   └── pub.go
│   ├── module         // Module directory, each subdirectory implements a module's functionality, typically defined in internal/interface/service/.
│   │   └── demo
│   │       ├── demo_svc.go
│   │       └── error.go
│   ├── pkg
│   │   └── utils
│   │       └── error.go
│   └── router           // Define routers in this directory.
│       ├── auth_router.go
│       └── pub_router.go
└── tests
    └── api
        └── demo.http
```

## Router
In the directory `internal/router`, two `gin.IRouter`s are implemented:
- pubRouter: Public router, endpoints mounted under this router can be accessed without authorization.
- authRouter: Authenticated router, endpoints mounted under this router require authorization.

Let's analyze the code in `internal/router/pub_router.go`:
```go
package router

import (
	"web-app/internal/middleware"
	"github.com/gone-io/gone"
)

const IdRouterPub = "router-pub"

//go:gone
func NewPubRouter() (gone.Goner, gone.GonerId) {
	return &pubRouter{}, IdRouterPub
}

type pubRouter struct {
	gone.Flag
	gone.IRouter
	root gone.IRouter               `gone:"gone-gin-router"`
	pub  *middleware.PubMiddleware `gone:"*"`
}

func (r *pubRouter) AfterRevive() gone.AfterReviveError {
	r.IRouter = r.root.Group("/api", r.pub.Next)
	return nil
}
```

1. For routers, they need to implement the methods defined in `gone.IRouter`.
2. The struct `pubRouter` embeds an `gone.IRouter`, which means it directly implements the `gone.IRouter` interface. It is only assigned a value in `AfterRevive()`.
3. `r.IRouter = r.root.Group("/api", r.pub.Next)` means the current router is a subrouter under the root router at `/api`, with an additional middleware `r.pub.Next`.
4. `root gone.IRouter` is a framework-level Goner provided by the `github.com/gone-io/gone/goner/gin` package, with a named injection `gone-gin-router`.

## Controller

Below is the definition of the Controller interface:
```go
// Controller interface, implemented by business code to mount and handle routes
// For usage, refer to [Sample Code](https://gitlab.openviewtech.com/gone/gone-example/-/tree/master/gone-app)
type Controller interface {
	// Mount   Route mounting interface, this function will be called before service startup, and the implementation of this function should usually return `nil`
	Mount() MountError
}
```


To write HTTP interfaces, we need to implement the `Controller` interface and mount the interface routes in the `Mount` method, as shown in the code in `internal/controller/demo_ctr.go`:
```go
package controller

import (
	"web-app/internal/interface/service"
	"web-app/internal/pkg/utils"
	"github.com/gone-io/gone"
)

//go:gone
func NewDemoController() gone.Goner {
	return &demoController{}
}

type demoController struct {
	gone.Flag
	demoSvc service.IDemo `gone:"*"`  // Dependency injection of service

	authRouter gone.IRouter `gone:"router-auth"`  // Router injection
	pubRouter  gone.IRouter `gone:"router-pub"`   // Router injection
}

func (ctr *demoController) Mount() gone.GinMountError {

	ctr.
		authRouter.
		Group("/demo").
		GET("/show", ctr.showDemo)

	ctr.
		pubRouter.
		Group("/demo2").
		GET("/show", ctr.showDemo).
		GET("/error", ctr.error).
		GET("/echo", ctr.echo)

	return nil
}

func (ctr *demoController) showDemo(ctx *gone.Context) (any, error) {
	return ctr.demoSvc.Show()
}

func (ctr *demoController) error(ctx *gone.Context) (any, error) {
	return ctr.demoSvc.Error()
}

func (ctr *demoController) echo(ctx *gone.Context) (any, error) {
	type Req struct {
		Echo string `form:"echo"`
	}

	var req Req
	if err := ctx.Bind(&req); err != nil {
		return nil, gone.NewParameterError(err.Error(), utils.ParameterParseError)
	}
	return ctr.demoSvc.Echo(req.Echo)
}
```


## Service
As per the standard, we require service interfaces to be defined in the `internal/interface/service` directory. File names should begin with `i_`, and interface types should start with `I`, for example:

File: i_demo.go
```go
package service

import "web-app/internal/interface/domain"

type IDemo interface {
	Show() (*domain.DemoEntity, error)
	Echo(input string) (string, error)
	Error() (any, error)
}
```
The logic implementation of services is placed in the `internal/module` directory, organized into modules.

## [Use Database](https://goner.fun/guide/xorm.html)
---
sidebar: auto
prev: ./simple
next: false
---

# Web + MySQL
In this document, I will demonstrate how to create a production-ready web project and provide a brief introduction to the project. The project uses MySQL as the database and Docker Compose to manage containers.

## Install the gone Tool
```bash
go install github.com/gone-io/gone/tools/gone@latest
```
For more information about the gone command, refer to: [Gone Tool](https://goner.fun/references/gone-tool.html)

## Create a Project Using the gone Command

```bash
gone create -t web+mysql web-mysql-docker
```
The above command will create a directory named web-mysql-docker in the current directory.

## Compile And Run
> Ensure you have make installed; if not, please install it first.
> Ensure you have docker and docker compose installed; if not, refer to: https://docs.docker.com/engine/install/.

Execute the following commands:
```bash
# Enter the project directory
cd web-mysql-docker

# Generate the Priest functions: https://goner.fun/guide/auto-gen-priest.html
make gone


# Start the MySQL service
docker compose up -d mysql

# Compile and run
make run
```

The logs should display as follows:
```bash
➜  web-mysql-docker make run
make gone
make install-gone
go install github.com/gone-io/gone/tools/gone@latest
go mod tidy
go generate ./...
go run cmd/server/main.go
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/heaven
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/cemetery
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/goner/tracer/tracer
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/goner/logrus/logger
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/goner/config/config
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/goner/config/propertiesConfigure
2024-05-14 12:42:03.574|INFO|Init|Revive github.com/gone-io/gone/goner/logrus/logger
2024-05-14 12:42:03.574|INFO|Init|==>Use Env: local
2024-05-14 12:42:03.574|WARNING|Init|properties: /var/folders/jv/rn9b7nhs2ls1n1j_lqj005r80000gn/T/go-build521033176/b001/exe/config/default.properties not found. skipping
2024-05-14 12:42:03.574|WARNING|Init|properties: /var/folders/jv/rn9b7nhs2ls1n1j_lqj005r80000gn/T/go-build521033176/b001/exe/config/local.properties not found. skipping
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/config/config
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/config/propertiesConfigure
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/xorm/engine
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/cmux/server
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/gin/proxy
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/gin/router
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/gin/sysProcessor
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/gin/responser
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/gin/server
2024-05-14 12:42:03.575|INFO|Init|Revive github.com/gone-io/gone/goner/gin/httpInjector
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/controller/demoController
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/middleware/AuthorizeMiddleware
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/middleware/PubMiddleware
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/module/demo/db
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/module/demo/demoService
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/router/authRouter
2024-05-14 12:42:03.575|INFO|Init|Revive web-mysql/internal/router/pubRouter
[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /api/demo/show            --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func5 (8 handlers)
[GIN-debug] GET    /api/demo2/show           --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func5 (7 handlers)
[GIN-debug] GET    /api/demo2/error          --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func5 (7 handlers)
[GIN-debug] GET    /api/demo2/echo           --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func5 (7 handlers)
[GIN-debug] GET    /api/inject-query         --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] GET    /api/inject/:key          --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] POST   /api/inject-http-body     --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] GET    /api/inject-http-struct   --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] POST   /api/users                --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] GET    /api/users                --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] GET    /api/users/page           --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] GET    /api/users/:id            --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] PUT    /api/users/:id            --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
[GIN-debug] DELETE /api/users/:id            --> github.com/gone-io/gone/goner/gin.(*proxy).Proxy.(*proxy).proxyOne.func8 (7 handlers)
2024-05-14 12:42:03.576|INFO|/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.3.1/goner/gin/server.go:46||Server Listen At :8080
2024-05-14 12:42:03.576|INFO|/Users/jim/go/pkg/mod/xorm.io/xorm@v1.3.2/log/logger_context.go:90||PING DATABASE mysql
2024-05-14 12:42:03.585|INFO|/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.3.1/cemetery.go:329||Revive [Anonymous Goner]
2024-05-14 12:42:03.585|INFO|/Users/jim/works/gone-io/web-app/demo/web-mysql-docker/cmd/server/main.go:28||before start
```
## API Testing

I'm going to test using the built-in HTTP Request plugin in Goland. Open the project in Goland, navigate to the file `tests/api/user.http`, and select the `dev` environment to run, as shown below:

![Run](../img/image9.png)

Execution Result:
![Result](../img/image10.png)

## Project Brief Introduction

### Directory Structure
```bash
├── Dockerfile
├── Makefile
├── README.md
├── cmd
│   └── server
│       └── main.go # File containing the main method of the project
├── config          # Project configuration directory
│   ├── default.properties # Default configuration
│   ├── dev.properties     # Development environment configuration
│   ├── local.properties   # Local environment configuration
│   └── prod.properties    # Production environment configuration
├── docker-compose.yaml    # docker-compose, defines mysql and web containers
├── go.mod
├── internal
│   ├── controller         # Controller
│   │   └── demo_ctr.go
│   ├── interface          # Interface directory
│   │   ├── domain         # Domain models
│   │   │   ├── demo.go
│   │   │   ├── page.go
│   │   │   └── user.go
│   │   ├── entity         # Entity models
│   │   │   └── User.go
│   │   └── service        # Service interfaces
│   │       └── i_demo.go  # Typically one interface per file, file name starts with `i_`, interface name starts with `I`, e.g., `IDemo`
│   ├── master.go
│   ├── middleware         # Middleware directory, can define unified processing logic such as authentication
│   │   ├── authorize.go
│   │   └── pub.go
│   ├── module             # Module directory
│   │   └── demo           # Demo module
│   │       ├── db.go      # Implementation of demo module's database interface
│   │       ├── demo_svc.go # Demo Service, implementing `service.IDemo` interface
│   │       ├── error.go    # Error code definition for the current directory
│   │       └── i_db.go    # Database interface of the demo module
│   ├── pkg                # Public utilities directory
│   │   └── utils
│   │       └── error.go
│   ├── priest.go         # Not present when created by gone create, generated by running `make gone`
│   └── router            # Router directory
│       ├── auth_router.go # Defines authenticated router groups
│       └── pub_router.go  # Defines unauthenticated router groups
├── scripts                # Script directory, used to store some scripts
│   └── mysql
│       └── initdb.d       # mysql initdb.d directory, all sql files under this directory will be executed when mysql defined in docker-compose starts for the first time
│           └── user.sql
└── tests                  # Integration test directory
    └── api                # API test directory
        ├── demo.http
        ├── http-client.env.json
        └── user.http
```

### Project Features
- Ready to use, no additional configuration needed to run
- Provides a `Dockerfile` for easy deployment to various container environments
- Integrated commands like gone, go, docker, and docker compose using Makefile
- Automatically generates Priest functions for smoother development
- Utilizes the gone framework, incorporating dependency injection
- Decoupling through interface usage
- Supports configuration writing for different environments
- Integrated MySQL database

### Partial Code Explanation
```go
//...
    // CRUD operations for user data under the demo module, mounted on authRouter for demonstration purposes
    ctr.
        pubRouter.
        Group("/users").
        POST("", func(in struct {
            // Body injection, parses HTTP body into a struct based on contentType, supports json, xml, form-data, x-www-form-urlencoded, etc.
            req *domain.User `gone:"http,body"`
        }) error {
            return ctr.demoSvc.CreateUser(in.req)
        }).
        GET("", func() (any, error) {
            return ctr.demoSvc.ListUsers()
        }).
        GET("/page", func(in struct {
            query domain.PageQuery `gone:"http,query"` // Query injection
        }) (any, error) {
            return ctr.demoSvc.PageUsers(in.query)
        }).
        GET("/:id", func(in struct {
            id int64 `gone:"http,param"`              // Url parameter injection, injected from the route defined as `:id`
        }) (any, error) {
            return ctr.demoSvc.GetUserById(in.id)
        }).
        PUT("/:id", func(in struct {
            id  int64        `gone:"http,param"` // Url parameter injection, injected from the route defined as `:id`
            req *domain.User `gone:"http,body"`  // Body injection
        }) error {
            return ctr.demoSvc.UpdateUserById(in.id, in.req)
        }).
        DELETE("/:id", func(in struct {
            id int64 `gone:"http,param"` // Url parameter injection, injected from the route defined as `:id`
        }) error {
            return ctr.demoSvc.DeleteUser(in.id)
        })
//...
```
The above code snippet is taken from the `internal/controller/demo_ctr.go` file.

### HTTP Injection

As observed, **Gone** supports dependency injection on route handling functions. This is achieved by using an anonymous struct as the input parameter of the handling function and marking the struct attributes with special tags.
The injection tags used in the above code are:
- `gone:"http,body"`: Body injection, parses HTTP body into a struct based on contentType, supports json, xml, form-data, x-www-form-urlencoded, etc. The injected struct attribute should be of type **struct** or **struct pointer**.
- `gone:"http,query"`: Query injection, the injected struct attribute can be of type **struct**, **struct pointer**, **string**, **Number (int, uint, float64, etc.)**, or **Slice of string or Number**.
- `gone:"http,param"`: URL parameter injection, injected from the route defined as `:id`. The injected struct attribute should be of type **string** or **Number**.

Additionally, handling functions also support injection of some special structs or pointers (pointers are recommended):
- `gone.Content`: Request context
- `http.Request`: HTTP request
- `http.Header`: Request header
- `url.Url`: URL

The framework supports more injection tags and types, please refer to the documentation [HTTP Injection](https://goner.fun/en/references/http-inject.html).

### Request Handling Function Parameters

Request handling functions can have the following return formats:
1. No return parameters
2. Return a non-`error` parameter
3. Return data and `error`

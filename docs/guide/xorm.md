---
sidebar: auto
prev: ./config
next: ./hooks
---
# Supporting Database Operations with Built-in Goners

[[toc]]

## Example with MySQL

### 1. Prepare MySQL Service

You can quickly set up a MySQL service using Docker Compose. Create a `docker-compose.yaml` file with the following content:

```yaml
version: "3.5"

services:
  mysql:
    image: mysql:8.3
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: demo
    volumes:
      - ./data/mysql:/var/lib/mysql
    ports:
      - "3306:3306"
```

Run the following command in the terminal to start the MySQL service:

```bash
docker-compose -f docker-compose.yaml up -d
```

### 2. Create Module and Configuration

Execute the following commands to set up the project structure and configuration:

```bash
mkdir use-rdb
cd use-rdb

# Initialize Go module
go mod init use-rdb

# Create database configuration
mkdir config
cat >> config/default.properties<<eof

# Use MySQL database
database.driver-name=mysql

# Data Source Name (DSN)
database.dsn=root:123456@tcp(localhost:3306)/demo?charset=utf8mb4&loc=Local
eof
```

### 3. Write Code

Create a file named `main.go` with the following code:

```go
package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql" // ⚠️ Import MySQL driver explicitly
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner"
	"github.com/gone-io/gone/goner/xorm" // ⚠️ Import xorm package from gone
)

type Demo struct {
	Id   int64
	Data string
}

type SqlExecutor struct {
	gone.Flag
	db xorm.Engine `gone:"gone-xorm"`
}

func (e *SqlExecutor) Execute() {
	// Synchronize table structure
	err := e.db.Sync(new(Demo))
	if err != nil {
		println(err.Error())
		return
	}

	demo := Demo{Data: "hello gone"}

	// Insert data
	_, err = e.db.Insert(
		&demo,
		Demo{Data: "The most Spring programmer-friendly Golang framework, dependency injection, integrates Web. "},
	)

	if err != nil {
		println(err.Error())
		return
	}

	fmt.Printf("demo: %v\n", demo)

	var list []Demo

	// Read data
	err = e.db.Find(&list)
	if err != nil {
		println(err.Error())
		return
	}

	fmt.Printf("demo records:%v\n", list)
}

func main() {
	gone.
		Prepare(func(cemetery gone.Cemetery) error {
			// Bury xorm-related Goners into the cemetery using goner.XormPriest
			_ = goner.XormPriest(cemetery)

			cemetery.Bury(&SqlExecutor{})
			return nil
		}).
		// Execute after the Gone application starts
		AfterStart(func(in struct {
			e SqlExecutor `gone:"*"`
		}) {
			in.e.Execute()
		}).
		Run()
}
```

### 4. Run the Code

Run the following commands:

```bash
go mod tidy
go run main.go
```



The running result is as follows:
```log {18-19}
2024-05-10 16:56:52.767|INFO|Init|Revive github.com/gone-io/gone/heaven
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/cemetery
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/tracer/tracer
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/logrus/logger
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/config/config
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/config/propertiesConfigure
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/logrus/logger
2024-05-10 16:56:52.768|INFO|Init|==>Use Env: local
2024-05-10 16:56:52.768|WARNING|Init|properties: /var/folders/jv/rn9b7nhs2ls1n1j_lqj005r80000gn/T/go-build1582606196/b001/exe/config/default.properties not found. skipping
2024-05-10 16:56:52.768|WARNING|Init|properties: /var/folders/jv/rn9b7nhs2ls1n1j_lqj005r80000gn/T/go-build1582606196/b001/exe/config/local.properties not found. skipping
2024-05-10 16:56:52.768|WARNING|Init|properties: /Users/jim/works/gone-io/gone/example/use-rdb/config/local.properties not found. skipping
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/config/config
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/config/propertiesConfigure
2024-05-10 16:56:52.768|INFO|Init|Revive github.com/gone-io/gone/goner/xorm/engine
2024-05-10 16:56:52.768|INFO|Init|Revive main/SqlExecutor
2024-05-10 16:56:52.769|INFO|/Users/jim/go/pkg/mod/xorm.io/xorm@v1.3.2/log/logger_context.go:90||PING DATABASE mysql
2024-05-10 16:56:52.783|INFO|/Users/jim/works/gone-io/gone/cemetery.go:307||Revive /
demo:{1 hello gone}
demo records:[{1 hello gone} {2 The most Spring programmer-friendly Golang framework, dependency injection, integrates Web. }]
```
## Points to Note
### 1. `github.com/gone-io/gone/goner` is a wrapper for `xorm.io/xorm`
The wrapper logic is roughly as follows: `xorm` is wrapped as an [Angel Goner](https://goner.fun/en/guide/core-concept.html#%F0%9F%98%87angel-%E5%A4%A9%E4%BD%BF); data connection is established in the `Start` method, and the database connection is closed in the `Stop` method. When using it, there is no need to import the `xorm.io/xorm` package directly, only `github.com/gone-io/gone/goner` needs to be imported. The wrapper relies on `github.com/gone-io/gone/tree/main/goner/config` to implement configuration. The burial of configuration-related Goners is automatically completed in the `goner.XormPriest` function.
Supported configuration items in the configuration file:

- `database.driver-name`: Name of the driver, supports mainstream databases like MySQL, PostgreSQL, etc. For details, refer to the [xorm documentation](https://xorm.io/docs/1.engine/)
- `database.dsn`: Data source name, refer to the [xorm documentation](https://xorm.io/docs/1.engine/)
- `database.max-idle-count`: Maximum number of idle connections in the connection pool
- `database.max-open`: Maximum number of connections in the connection pool
- `database.max-lifetime`: Maximum lifetime of a connection
- `database.showSql`: Whether to print executed SQL statements

### 2. Injection via `gone-xorm` **GonerId**
In the Goner where the xorm engine is needed, use the `gone:"gone-xorm"` tag to inject `xorm.Engine`, properties can be named or anonymous:
```go
type XormUser struct {
    // Named
    db xorm.Engine `gone:"gone-xorm"`
}

// Or
type XormUser struct {
    // Anonymous
    xorm.Engine `gone:"gone-xorm"`
}
```
`xorm.Engine` "inherits" the `xorm.io/xorm.EngineInterface` interface, so `xorm.Engine` supports all methods in the [xorm documentation](https://xorm.io/docs/).

### 3. Pay Attention to Imported Packages
- Import the database driver, which varies for different databases:
```go
import (
	_ "github.com/go-sql-driver/mysql"
)
```

- Import the xorm package as `github.com/gone-io/gone/goner/xorm`, not `xorm.io/xorm`:
```go
import (
	"github.com/gone-io/gone/goner/xorm" #📢⚠️Special attention needed, import the xorm package wrapped by gone
)
```
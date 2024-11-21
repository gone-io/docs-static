---
sidebar: auto
prev: ./http-inject
next: ./
---

# `goner/xorm` User Guide

## Import and Loading

- Import the `goner` package:
  ```go
  "github.com/gone-io/gone/goner"
  ```

- Import database driver packages as needed:
  - MySQL driver:
    ```go
    _ "github.com/go-sql-driver/mysql"
    ```
  - SQLite3 driver:
    ```go
    _ "github.com/mattn/go-sqlite3"
    ```
  - PostgreSQL driver:
    ```go
    _ "github.com/lib/pq"
    ```
  - Oracle driver:
    ```go
    _ "github.com/mattn/go-oci8"
    ```
  - MSSQL driver:
    ```go
    _ "github.com/denisenkom/go-mssqldb"
    ```

- Load components into the `gone` framework:
  ```go
  _ = goner.XormPriest(cemetery)
  ```

## Configuration

| Option                                       | Required           | Default | Description                                                                 |
| :------------------------------------------- | :-----------------: | ------- | --------------------------------------------------------------------------- |
| **database.cluster.enable**                  | No                 | `false` | Enables cluster mode.                                                       |
| **database.driver-name**                     | Yes (non-cluster)  | -       | Database driver name. Supported: `mysql`, `sqlite3`, `postgres`, `oracle`, `mssql`. |
| **database.dsn**                             | Yes (non-cluster)  | -       | Database connection string.                                                 |
| **database.max-idle-count**                  | No                 | `5`     | Maximum number of idle connections in the pool.                             |
| **database.max-open**                        | No                 | `20`    | Maximum number of open connections in the pool.                             |
| **database.max-lifetime**                    | No                 | `10m`   | Maximum lifetime of a connection.                                           |
| **database.show-sql**                        | No                 | `true`  | Enables SQL logging.                                                        |
| **database.cluster.master.driver-name**      | Yes (cluster)      | -       | Driver name for the master database. Supported: `mysql`, `sqlite3`, `postgres`, `oracle`, `mssql`. |
| **database.cluster.master.dsn**              | Yes (cluster)      | -       | Connection string for the master database.                                  |
| **database.cluster.slaves[n].driver-name**   | Yes (cluster)      | -       | Driver name for a slave database. Supported: `mysql`, `sqlite3`, `postgres`, `oracle`, `mssql`. |
| **database.cluster.slaves[n].dsn**           | Yes (cluster)      | -       | Connection string for a slave database.                                     |

### Non-Cluster Example
```ini
database.driver-name=mysql
database.dsn=root:123456@tcp(127.0.0.1:3306)/test?charset=utf8mb4&parseTime=True&loc=Local
```

### Cluster Mode Example
```ini
database.cluster.enable=true

# Master database configuration
database.cluster.master.driver-name=mysql
database.cluster.master.dsn=root:123456@tcp(master-db-host:3306)/test?charset=utf8mb4&parseTime=True&loc=Local

# Slave database configuration
database.cluster.slaves[0].driver-name=mysql
database.cluster.slaves[0].dsn=root:123456@tcp(slave-db-0-host:3306)/test?charset=utf8mb4&parseTime=True&loc=Local

database.cluster.slaves[1].driver-name=mysql
database.cluster.slaves[1].dsn=root:123456@tcp(slave-db-1-host:3306)/test?charset=utf8mb4&parseTime=True&loc=Local

database.cluster.slaves[2].driver-name=mysql
database.cluster.slaves[2].dsn=root:123456@tcp(slave-db-1-host:3306)/test?charset=utf8mb4&parseTime=True&loc=Local

# ... additional slave databases
```

## Injecting Database Engines in Code
```go
import "github.com/gone-io/gone"

type dbUser struct {
	gone.Flag
	db gone.XormEngine `gone:"*"` // Inject the database engine. In cluster mode, this injects the database cluster. Queries use slave databases randomly; writes use the master database.
	masterDb gone.XormEngine `gone:"xorm,master"` // Inject the master database. Effective in cluster mode.
	slaveDb0 gone.XormEngine `gone:"xorm,slave=0"` // Inject slave database 0. Effective in cluster mode.
	slaveDb1 gone.XormEngine `gone:"xorm,slave=1"` // Inject slave database 1. Effective in cluster mode.
	slaveDbs []gone.XormEngine `gone:"xorm"`      // Inject a slice of slave databases. Effective in cluster mode.
}

type Book struct {
	Id    int64
	Title string
}

func (d *dbUser) GetBookById(id int64) (book *Book, err error) {
	book = new(Book)
	has, err := d.db.Where("id=?", id).Get(book)
	if err != nil {
		return nil, gone.ToError(err)
	}
	if !has {
		return nil, gone.NewParameterError("book not found", 404)
	}
	return book, nil
}
```

## Multi-Database Support

### 1. Configuring Multiple Databases
Configuration prefixes follow the pattern `database.{name}` (e.g., `database.db1`, `database.db2`).

| Option                                           | Required           | Default | Description                                                               |
| :----------------------------------------------- | :-----------------: | ------- | ------------------------------------------------------------------------- |
| **{prefix}.cluster.enable**                      | No                 | `false` | Enables cluster mode.                                                     |
| **{prefix}.driver-name**                         | Yes (non-cluster)  | -       | Database driver name. Supported: `mysql`, `sqlite3`, `postgres`, `oracle`, `mssql`. |
| **{prefix}.dsn**                                 | Yes (non-cluster)  | -       | Database connection string.                                               |
| **{prefix}.max-idle-count**                      | No                 | `5`     | Maximum number of idle connections in the pool.                           |
| **{prefix}.max-open**                            | No                 | `20`    | Maximum number of open connections in the pool.                           |
| **{prefix}.max-lifetime**                        | No                 | `10m`   | Maximum lifetime of a connection.                                         |
| **{prefix}.show-sql**                            | No                 | `true`  | Enables SQL logging.                                                      |
| **{prefix}.cluster.master.driver-name**          | Yes (cluster)      | -       | Driver name for the master database. Supported: `mysql`, `sqlite3`, `postgres`, `oracle`, `mssql`. |
| **{prefix}.cluster.master.dsn**                  | Yes (cluster)      | -       | Connection string for the master database.                                |
| **{prefix}.cluster.slaves[n].driver-name**       | Yes (cluster)      | -       | Driver name for a slave database. Supported: `mysql`, `sqlite3`, `postgres`, `oracle`, `mssql`. |
| **{prefix}.cluster.slaves[n].dsn**               | Yes (cluster)      | -       | Connection string for a slave database.                                   |

### 2. Injecting Multiple Databases
```go
import "github.com/gone-io/gone"

type dbUser struct {
	gone.Flag

	// Inject the database engine for `database.db1`.
	db1 gone.XormEngine `gone:"xorm,db=database.db1"`

	// Inject the master database for `database.db1`.
	masterDb gone.XormEngine `gone:"xorm,db=database.db1,master"`

	// Inject slave database 0 for `database.db1`.
	slaveDb0 gone.XormEngine `gone:"xorm,db=database.db1,slave=0"`

	// Inject slave database 1 for `database.db1`.
	slaveDb1 gone.XormEngine `gone:"xorm,db=database.db1,slave=1"`

	// Inject a slice of slave databases for `database.db1`.
	slaveDbs []gone.XormEngine `gone:"xorm,db=database.db1"`
}
```

## Enhancements to Xorm in Gone

### 1. Automatic Transactions
Use the `Transaction` function to wrap database operations. A transaction is automatically started, and if an `error` is returned or a `panic` occurs, the transaction will roll back. Otherwise, it will commit automatically.

> **Note**: Database operations in a `Transaction` must use a `session` of type `xorm.Interface`.

```go
type db struct {
	gone.Flag
	gone.XormEngine `gone:"gone-xorm"` // Inject the database engine.
}

func (d *db) updateUser(user *entity.User) error {
	// Wrap the operation with Transaction to automatically handle commits/rollbacks.
	return d.Transaction(func(session xorm.Interface) error {
		_, err := session.ID(user.Id).Update(user)
		return gone.ToError(err)
	})
}
```

### 2. Nested Transactions
Nested transactions automatically propagate into a single transaction. If one nested transaction returns an `error` or a `panic` occurs, the entire transaction will roll back. 

```go
func (d *db) updateUser(user *entity.User) error {
	return d.Transaction(func(session xorm.Interface) error {
	
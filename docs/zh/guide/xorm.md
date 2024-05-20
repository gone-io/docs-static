---
sidebar: auto
prev: ./config
next: ./hooks
---

# 通过内置Goners支持数据库操作

[[toc]]


## 以Mysql举个例子，源代码在[这里](https://github.com/gone-io/gone/tree/main/example/use-rdb)可以找到
### 1.准备mysql服务，可以使用docker-compose快速启动一个Mysql服务

docker-compose.yaml 内容如下：
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
命令行执行下面代码，启动mysql服务：
```bash
docker-compose -f docker-compose.yaml up -d
```
### 2. 创建mod和配置
执行如下命令：
```bash
mkdir use-rdb
cd use-rdb

# 创建mod
go mod init use-rdb

# 创建数据库配置
mkdir config
cat >> config/default.properties<<eof

# 配置使用mysql数据库
database.driver-name=mysql

#数据源
database.dsn=root:123456@tcp(localhost:3306)/demo?charset=utf8mb4&loc=Local
eof
```

### 3. 编写代码如下：

文件名：main.go
```go
package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql" #⭐️需要特别注意，需要引入mysql的驱动
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner"
	"github.com/gone-io/gone/goner/xorm" #⭐️需要特别注意，导入的是gone封装的xorm包
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

    // 同步表结构
	err := e.db.Sync(new(Demo))
	if err != nil {
		println(err.Error())
		return
	}

	demo := Demo{Data: "hello gone"}

    // 插入数据
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

    // 读取数据
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
			// 通过 goner.XormPriest 将xorm相关的Goner埋葬到 cemetery
            _ = goner.XormPriest(cemetery)

			cemetery.Bury(&SqlExecutor{})
			return nil
		}).
        // 在Gone启动完成后执行
		AfterStart(func(in struct {
			e SqlExecutor `gone:"*"`
		}) {
			in.e.Execute()
		}).
		Run()
}
```

### 3. 运行代码
执行如下命令：
```bash
go mod tidy
go run main.go
```

运行结果如下：
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

## 需要注意的点
### 1. `github.com/gone-io/gone/goner` 是对 `xorm.io/xorm` 的封装
封装的大概逻辑是：将xorm包装为一个[Angel Goner](https://goner.fun/zh/guide/core-concept.html#%F0%9F%98%87angel-%E5%A4%A9%E4%BD%BF);在Start方法中完成数据的连接；在Stop方法中关闭数据库连接。使用时不需要导入`xorm.io/xorm`包，只需要导入`github.com/gone-io/gone/goner`即可。封装中依赖了`github.com/gone-io/gone/tree/main/goner/config`来实现配置，在`goner.XormPriest`函数中已经自动完成了配置相关的Goner的[埋葬](https://goner.fun/zh/guide/core-concept.html#bury-%E5%9F%8B%E8%91%AC)。
配置文件中支持的配置项：

- database.driver-name 驱动的名称，支持 mysql、postgres 等主流数据库，具体可以参考 [xorm文档](https://xorm.io/zh/docs/chapter-01/1.engine/)
- database.dsn 数据源，参考 [xorm文档](https://xorm.io/zh/docs/chapter-01/1.engine/)
- database.max-idle-count 连接池，最大空闲连接数
- database.max-open 连接池，最大连接数
- database.max-lifetime 最大生存时间
- database.showSql 是否打印执行的SQL

### 2. 通过`gone-xorm`**GonerId**注入
在需要使用xorm引擎的Goner中，使用`gone:"gone-xorm"`标签注入`xorm.Engine`，属性可以具名也可以匿名：
```go
type XormUser struct {
    //具名
    db xorm.Engine `gone:"gone-xorm"`
}

// 或者
type XormUser struct {
    //匿名
    xorm.Engine `gone:"gone-xorm"`
}
```
在`xorm.Engine`中“继承”了`xorm.io/xorm.EngineInterface`接口，所以`xorm.Engine`支持[xorm文档](https://xorm.io/zh/docs/)中的所有方法。

### 3. 注意导入的包
- 需要导入数据库的驱动，不同数据库导入不一样：
```go
import (
	_ "github.com/go-sql-driver/mysql"
)
```

- 导入的xorm包是：`github.com/gone-io/gone/goner/xorm`，不是`xorm.io/xorm`:
```go
import (
	"github.com/gone-io/gone/goner/xorm" #⭐️需要特别注意，导入的是gone封装的xorm包
)
```
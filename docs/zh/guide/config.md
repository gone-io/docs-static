---
sidebar: auto
---

# 通过内置Goners支持配置文件

在gone中提供了通过内置Goners读取配置文件的方法，配置文件格式暂时只支持`.properties`。



## 举个例子
> 例子的代码源代码可以在[这里](https://github.com/gone-io/gone/tree/main/example/use-config)找到。

### 1. 创建mod
```bash
go mod init use-config
```

### 2. 添加配置文件
```bash
mkdir config
touch config/default.properties
```
config/default.properties 文件内容如下：
```properties
my.conf.int=10
my.conf.float64=10.222
my.conf.string=config test
my.conf.bool=true
my.conf.duration=10h
my.conf.sub.x=100x
my.conf.sub.y=200y
```
### 3. 添加代码
```bash
touch main.go
```

main.go 文件内容如下：
```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/config"
	"time"
)

type SubConf struct {
	X string `properties:"x"`
	Y string `properties:"y"`
}

type UseConfig struct {
	gone.Flag

	int      int           `gone:"config,my.conf.int"`
	float64  float64       `gone:"config,my.conf.float64"`
	string   string        `gone:"config,my.conf.string"`
	bool     bool          `gone:"config,my.conf.bool"`
	duration time.Duration `gone:"config,my.conf.duration"`
	defaultV string        `gone:"config,my.conf.default,default=ok"`

	sub *SubConf `gone:"config,my.conf.sub"`
}

func (g *UseConfig) AfterRevive() gone.AfterReviveError {
	fmt.Printf("int=%d\n", g.int)
	fmt.Printf("float64=%f\n", g.float64)
	fmt.Printf("string=%s\n", g.string)
	fmt.Printf("bool=%t\n", g.bool)
	fmt.Printf("duration=%v\n", g.duration)
	fmt.Printf("defaultV=%s\n", g.defaultV)
	fmt.Printf("sub.x=%v\n", g.sub)

	return nil
}

func main() {
	gone.Run(func(cemetery gone.Cemetery) error {
		_ = config.Priest(cemetery)
		cemetery.Bury(&UseConfig{})
		return nil
	})
}

```
### 4. 运行
```bash
go mod tidy
go run main.go
```
运行结果如下：
```log
int=10
float64=10.222000
string=config test
bool=true
duration=10h0m0s
defaultV=ok
sub.x=&{100x 200y}
```

## 配置注入
从例子中可以看到，配置项也可以通过“依赖注入”到Goner。

### 使用的标签格式
配置注入的标签格式如下：
```
gone:"config,${key},default=${defaultValue}"
```

::: tip 其中含义如下:
1. 标签名依然为`gone`
2. `config`为固定值，表示该属性为配置
3. `${key}`为配置在配置文件中的key
4. `default=${defaultValue}`用于指定默认值，可以省略；`${defaultValue}`为默认值；如果没有指定默认值；如果配置文件中缺少对应key，则会报错
:::

### 支持注入的数据类型


### 配置文件存放的路径

#### 目录
#### 环境变量
#### 配置加载的优先级

#### 如何实现的
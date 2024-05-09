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
my.conf.int8=130
my.conf.float64=10.222
my.conf.string=config test
my.conf.bool=true
my.conf.duration=10h
my.conf.sub.x=100x
my.conf.sub.y=200y
my.conf.subs[0].x=0000x
my.conf.subs[0].y=0000y

my.conf.subs[1].x=1111x
my.conf.subs[1].y=1111y
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
	int8     int8          `gone:"config,my.conf.int8"`
	printInt *int          `gone:"config,my.conf.int8"` //指针 指向int
	float64  float64       `gone:"config,my.conf.float64"`
	string   string        `gone:"config,my.conf.string"`
	bool     bool          `gone:"config,my.conf.bool"`
	duration time.Duration `gone:"config,my.conf.duration"`
	defaultV string        `gone:"config,my.conf.default,default=ok"`

	sub *SubConf `gone:"config,my.conf.sub"` //指针，指向结构体

	subs []SubConf `gone:"config,my.conf.subs"` //数组
}

func (g *UseConfig) AfterRevive() gone.AfterReviveError {
	fmt.Printf("int=%d\n", g.int)
	fmt.Printf("int8=%d\n", g.int8)
	fmt.Printf("printInt=%d\n", *g.printInt)
	fmt.Printf("float64=%f\n", g.float64)
	fmt.Printf("string=%s\n", g.string)
	fmt.Printf("bool=%t\n", g.bool)
	fmt.Printf("duration=%v\n", g.duration)
	fmt.Printf("defaultV=%s\n", g.defaultV)
	fmt.Printf("sub.x=%v\n", g.sub)
	fmt.Printf("subs=%v\n", g.subs)

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
```
int=10
int8=-126
printInt=130
float64=10.222000
string=config test
bool=true
duration=10h0m0s
defaultV=ok
sub.x=&{100x 200y}
subs=[{0000x 0000y} {1111x 1111y}]
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
> 在 [核心概念-Goner](https://goner.fun/zh/guide/core-concept.html#goner-%E9%80%9D%E8%80%85)中，我们讲到Goner可以被注入到其他结构体的属性上；这里，配置作为一种特殊情况，也可以被注入到其他结构体的属性上，他的实现是通过的[Vampire（吸血鬼）](https://goner.fun/zh/guide/core-concept.html#%F0%9F%A7%9B%F0%9F%8F%BB%E2%80%8D%E2%99%80%EF%B8%8Fvampire-%E5%90%B8%E8%A1%80%E9%AC%BC)，如果感觉兴趣，可以看[这部分源代码](https://github.com/gone-io/gone/tree/v0.1.5/goner/config)。

属性支持的类型，列举如下：
1. 基础类型
   - 布尔型：bool
   - 整数类型：int, int64, int32, int16, int8
   - 非负整数类型：uint, uint64, uint32, uint16, uint8
   - 浮点型：float64, float32
   - 字符串类型：string

::: tip
整数类型和非负整数类型，需要注意数据结构表示的数的范围，数字过大可能会溢出；比如`int8`表示的范围是`-128` ~ `127`，如果用其接收一个大于127的配置就会发生溢出（配置128将得到-128）。
:::

2. time.Duration
为方便时间的解析，支持了`time.Duration`类型的配置，可以使用下面的单位：
   - ns 纳秒
   - us 微秒
   - ms 毫秒
   - s 秒
   - m 分钟
   - h 小时

在例子中，`my.conf.duration=10h`单位为h，表示10个小时；`1h10m10s`则表示1小时10分10秒。

::: tip
实现采用的`time.ParseDuration`，所以可以参考：[https://pkg.go.dev/time#ParseDuration](https://pkg.go.dev/time#ParseDuration)
:::

3. 结构体类型
在例子中，给出了配置结构体的类型，需要满足如下规则：
   - 结构体中需要配置的属性为公开的，即大写字母打头
   - 使用`properties`标签指定属性的名字
   - 支持嵌套

说明：在例子中`UseConfig`的属性`sub`要读取的配置key为`my.conf.sub`；`sub`的类型为`SubConf`，标注了属性`X`的配置名为`properties:"x"`，那么`sub.X`的值将读取配置项`my.conf.sub.x`。

4. 数组类型
配置的注入支持Slice类型，Slice的元素目前只支持结构体、结构体的指针；配置的key形式如下：
```ini
${injectConfigkey}[${index}].${structAttributeName}
```
::: tip 说明
   -  `${injectConfigkey}`为待注入项的key
   -  `${index}`为数组下标
   -  `${structAttributeName}`为被注入结构体的属性上的`properties`标注的值
:::

5. 指针类型
支持被注入属性的类型为指针。

### 配置文件

#### 配置文件目录
配置文件存放的目录由三部分决定：
1. 可执行文件和程序当前工作路径
2. 相对配置目录
   相对配置目录默认是`config`，可以通过启动传参`--conf $configDir`来改变

举个例子，如果编译后的gone程序保存为`/app/gone-app`，我们进入`/home/degfy`目录运行：
```bash
cd /home/degfy/
/app/gone-app
```
并没有通过传参修改相对配置目录，那么该程序的配置目录为：
- /app/config
- /home/degfy/config

#### 默认配置文件路径
沿用前面的例子，配置文件的路径为：
- /app/config/default.properties
- /home/degfy/config/default.properties
这个两个配置文件中的配置为默认配置，是不随环境改变而改变的。

#### 环境相关配置文件路径
开发过程中，我们一般会分环境配置，一般情况会分为：
- local 本地开发环境
- dev 线上开发环境
- test 线上测试环境
- prod 生成环境

我们可以通过环境变量`ENV`或者在启动时传参`--nev $env`来指定当前环境，如果都没有设置，默认环境是`local`。
沿用前面的例子，与环境相关的配置文件为：
- /app/config/local.properties
- /home/degfy/config/local.properties


#### 配置加载的顺序
从前面，我们可以得知我们启动时会存在4个配置文件，他们的加载顺序如下：
1. /app/config/default.properties
2. /app/config/local.properties
3. /home/degfy/config/default.properties
4. /home/degfy/config/local.properties

如果这些配置文件中存在相同的配置项，后加载的值会先加载的值。也就是环境相关的配置会覆盖默认的配置，当前运行路径的配置会覆盖程序所在目录的配置。
::: tip 最佳实践
1. 将所有配置放到默认配置文件中；在环境相关配置文件中根据环境的需要进行覆盖；
2. 配置的设计应该尽量少，推荐采用“约定优配置”思路来进行设计，配置可以考虑赋予默认值；
3. 为了使代码“开箱可用”，推荐在local.properties中设置完整的配置，让程序不需要任何其他的配置就能运行，让其他小伙伴clone代码后就能丝滑启动程序。
:::
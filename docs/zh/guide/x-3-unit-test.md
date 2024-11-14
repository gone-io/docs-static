---
sidebar: auto
prev: ./x-2-error
next: ./x-4-hooks
---

# 单元测试

在一个依赖注入框架中如何进行单元测试，将依赖项先注入后再测试；如果测试内容和注入内容强相关，可以考虑对相关内容做mock；一种方式是注册mock后的Goner，另外一种方式时将已经注册的Goner，使用`cemetery.ReplaceBury`做替换性注册。

## 假设我们编写的Goner如下

文件名：goner.go
```go
package test

import (
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/config"
)

const pointNameA = "example-test-point-a"
const pointNameB = "example-test-point-b"

func NewPointA() (gone.Goner, gone.GonerId) {
	return &Point{}, pointNameA
}

func NewPointB() (gone.Goner, gone.GonerId) {
	return &Point{X: -1, Y: -1}, pointNameB
}

type Point struct {
	gone.Flag
	X int `gone:"config,example.test.point.a-x"`
	Y int `gone:"config,example.test.point.a-y,default=200"`
}

type Line struct {
	gone.Flag
	A *Point `gone:"example-test-point-a"`
	B *Point `gone:"example-test-point-b"`
}

func (*Line) Say() string {
	return ""
}

func NewLine() *Line {
	return &Line{}
}

func Priest(cemetery gone.Cemetery) error {
	cemetery.Bury(NewPointA())
	cemetery.Bury(NewPointB())
	cemetery.Bury(NewLine())
	return config.Priest(cemetery)
}
```

## 我们可以编写测试文件如下：
文件名：goner_test.go
```go
package test

import (
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/config"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_Line(t *testing.T) {
	t.Run("config default", func(t *testing.T) {
		gone.TestAt(pointNameA, func(point *Point) {
			assert.Equal(t, point.X, 1000)
			assert.Equal(t, point.Y, 200)
		}, config.Priest, Priest)
	})

	t.Run("config default", func(t *testing.T) {
		gone.Test(func(line *Line) {
			assert.Equal(t, line.A.Y, 200)
		}, Priest)
	})

	t.Run("ReplaceBury", func(t *testing.T) {
		gone.Test(func(line *Line) {
			assert.Equal(t, line.A.X, 20)
		}, Priest, func(cemetery gone.Cemetery) error {
			Mock := func() gone.Goner {
				return &Point{X: 20}
			}
			return cemetery.ReplaceBury(Mock(), pointNameA)
		})
	})
}
```

## 使用gomock做mock测试
我们编写了一个小工具来为接口生成mock代码：`gonectr mock`

一般的使用方法是，在需要mock的接口上加`//go:generate`注释，让生成过程在`go generate ./...`命令时自动完成，下面是一个例子：

文件名：i_point.go
```go
package test

//go:generate sh -c "gonectr mock -p=mock -s=$(dirname ${GOFILE}) -d=$(dirname ${GOFILE})/mock"
type IPoint interface {
	GetX() int
	GetY() int
}
```
上面`//go:generate sh -c "gonectr mock -p=mock -s=$(dirname ${GOFILE}) -d=$(dirname ${GOFILE})/mock"`的作用是为`IPoint`接口生成mock代码。

> 注意mockgen工具和gomock包的版本需要保持一致；
> 运行下面代码，安装最新版本：
> ```bash
> go get go.uber.org/mock
> ```
>
> 需要安装gone辅助工具；安装参考 [gone辅助工具](https://goner.fun/zh/references/gone-tool.html)。


好让，我们来试试吧，创建一个空目录并在进入后，将上文件`i_test.go`创建出来，让后在当前目录运行命令：
```bash
go generate ./...
```
可以看到，命令运行完后，将生成文件`mock/i_point.go`。

下面我们创建一个 `origin_point.go`文件，内容如下：
```go
package test

import "github.com/gone-io/gone"

type originPoint struct {
	gone.Flag
}

//go:gone
func NewOriginPoint() gone.Goner {
	return &originPoint{}
}

func (o *originPoint) GetX() int {
	return 100
}
func (o *originPoint) GetY() int {
	return 200
}
```

在创建一个名为`distance_calculator.go`的文件，内容如下：
```go
package test

import (
	"github.com/gone-io/gone"
	"math"
)

//go:gone
func NewDistanceCalculator() gone.Goner {
	return &distanceCalculator{}
}

type distanceCalculator struct {
	gone.Flag

	originPoint IPoint `gone:"*"`
}

func (d *distanceCalculator) CalculateDistanceFromOrigin(x, y int) float64 {
	originX, originY := d.originPoint.GetX(), d.originPoint.GetY()
	return math.Sqrt(math.Pow(float64(x-originX), 2) + math.Pow(float64(y-originY), 2))
}
```

`distanceCalculator` 的业务是计算`(x,y int)`到originPoint点的距离，`originPoint`是依赖注入的；现在我们来编写`CalculateDistanceFromOrigin`的测试函数如下：
```go
package test

import (
	"example/test/mock"
	gomock "go.uber.org/mock"
	"github.com/gone-io/gone"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_distanceCalculator_CalculateDistanceFromOrigin(t *testing.T) {

	//创建mock控制器
	controller := gomock.NewController(t)
	defer controller.Finish()

	gone.Test(func(d *distanceCalculator) {
		distance := d.CalculateDistanceFromOrigin(3, 4)

		assert.Equal(t, float64(5), distance)

	}, func(cemetery gone.Cemetery) error {

		//创建mock对象
		point := mock.NewMockIPoint(controller)
		point.EXPECT().GetX().Return(0)
		point.EXPECT().GetY().Return(0)

		//将mock对象注册到Gone
		cemetery.Bury(point)

		//被测试的对象也需要注册到Gone
		cemetery.Bury(NewDistanceCalculator())
		return nil
	})
}
```
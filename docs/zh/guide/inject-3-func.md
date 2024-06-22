---
sidebar: auto
prev: ./inject-2-goner.md
next: ./goner-a-use.md
---

# 函数参数的依赖注入
函数参数的依赖注入，是v1.x版本正式发布的新功能，允许使用Goners仓库中的Goners来自动生成函数的参数对应的`[]reflect.Value`数组。这个功能由`Cemetery`接口的`InjectFuncParameters`方法提供。

业务编写上，一般情况，不推荐使用该功能；如果尝试扩展Gone框架的功能，可以使用该功能。

## `InjectFuncParameters` 方法说明

- 方法定义
```go
InjectFuncParameters(
    fn any,
    injectBefore func(pt reflect.Type, i int) any,
    injectAfter func(pt reflect.Type, i int),
) (args []reflect.Value, err error)
```
- 入参说明：
  - fn，需要被注入的函数；函数允许拥有多个入参，入数可以是Gone框架中注册的接口或者结构体指针，也可以为被`gone`标记了属性的结构体，一般使用匿名结构体；
  - injectBefore，hook函数，在对第i个参数构造前调用，如果`injectBefore(x, i)`返回值非nil，InjectFuncParameters将不再构造fn函数的第`i`个参数，而是将该值的`reflect.Value`直接作为args数组的第i个值；
  - injectAfter，hook函数，在对第i个参数成功构造后调用；
- 出参说明
  - args，fn参数的`reflect.Value`数组
  - err，函数构造返回的错误
- 功能说明：
    根据fn函数的定义和Gone框架中注册的Goners，自动构造fn的参数数组args。然后可以使用`func (v Value) Call(in []Value) []Value`对函数进行调用。

## Gone 源代码中使用例子

### WrapNormalFnToProcess

```go
func WrapNormalFnToProcess(fn any) Process {

    // Process函数只有一个 Cemetery 参数
	return func(cemetery Cemetery) error {

        // 根据函数的定义，使用 cemetery.InjectFuncParameters 构造 函数的参数数组
		args, err := cemetery.InjectFuncParameters(fn, nil, nil)
		if err != nil {
			return err
		}

        //使用 reflect.ValueOf(fn).Call(args) 对函数进行调用
		results := reflect.ValueOf(fn).Call(args)
		for _, result := range results {
			if err, ok := result.Interface().(error); ok {
				return err
			}
		}
		return nil
	}
}
```
上面代码是截止于Gone中`help.go`，作用是将一个函数转换为Process。在看`prepare.go`中的代码：

```go
//...
func (p *Preparer) BeforeStart(fn any) *Preparer {
	p.heaven.BeforeStart(WrapNormalFnToProcess(fn))
	return p
}

func (p *Preparer) AfterStart(fn any) *Preparer {
	p.heaven.AfterStart(WrapNormalFnToProcess(fn))
	return p
}

func (p *Preparer) BeforeStop(fn any) *Preparer {
	p.heaven.BeforeStop(WrapNormalFnToProcess(fn))
	return p
}

func (p *Preparer) AfterStop(fn any) *Preparer {
	p.heaven.AfterStop(WrapNormalFnToProcess(fn))
	return p
}

func (p *Preparer) SetAfterStopSignalWaitSecond(sec int) {
	p.heaven.SetAfterStopSignalWaitSecond(sec)
}

func (p *Preparer) Run(fns ...any) {
	p.SetAfterStopSignalWaitSecond(0)
	for _, fn := range fns {
		p.AfterStart(fn)
	}
	p.heaven.
		Install().
		Start().
		Stop()
}
//...
```
可以看到，通过`Preparer`的`BeforeStart`、`AfterStart`、`BeforeStop`、`AfterStop`方法，可以将任意函数转换为Process，然后注册到`Heaven`中，原理上就是通过`WrapNormalFnToProcess`将任意函数转为了`Process`函数；`Preparer.Run` 方法之所以支持任意参数的函数，也是潜在的通过`WrapNormalFnToProcess`函数实现的。

### buildProxyFn

`buildProxyFn`方法的代码截取于`goner/gin/proxy.go`，是实现HTTP请求参数注入的关键函数，作用是将一个任意参数的函数转换为`gin.HandlerFunc`，然后就可以注册到gin.Engine中。使用`InjectFuncParameters`的目的是收集依赖，在函数构造前对Goners进行注入，对HTTP请求参数的依赖延迟到函数执行阶段完成注入。

```go
//...

func (p *proxy) buildProxyFn(x HandlerFunc, funcName string, last bool) gin.HandlerFunc {
	m := make(map[int]*bindStructFuncAndType)
	args, err := p.cemetery.InjectFuncParameters(
		x,

        //传入 hook injectBefore，完成 特殊参数的过滤
		func(pt reflect.Type, i int) any {
            //...
		},

        // 传入 hook injectAfter，收集 HTTP请求参数的依赖
		func(pt reflect.Type, i int) {
            //...
		},
	)

	if err != nil {
		p.Panicf("build Proxy func for \033[31m%s\033[0m error:\n\n%s", funcName, err)
	}

	fv := reflect.ValueOf(x)
	return func(context *gin.Context) {
		//...
        // 延迟注入 HTTP请求参数的依赖
        //...

		//call the func x
		values := fv.Call(parameters)

		//...
	}
}

//...
```

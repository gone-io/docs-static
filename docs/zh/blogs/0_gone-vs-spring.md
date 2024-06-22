---
sidebar: auto
sidebarDepth: 4
prev: ../blogs/
next: ./1_v1.x_release
---

# 对比 Gone 和 Spring 的依赖注入
Gone是我们开发的 Golang 依赖注入框架，Spring是Java的依赖注入框架；为了便于Spring程序员转Golang快速上手Gone，我们在这里对他们的依赖注入做一下对比。

## 依赖模块导入
### Spring
在项目管理工具中引入依赖；项目启动后自动扫描加载。
在 Maven 中 引入依赖
```xml
<dependency>
    <groupId>com.github.example</groupId>
    <artifactId>example</artifactId>
    <version>1.0.0</version>
</dependency>
```
在 Gradle 中 引入依赖
```groovy
implementation 'com.github.example:example:1.0.0'
```

### Gone
在MasterPriest函数中加载依赖模块提供的Priest函数；在启动前执行`go mod tidy`将依赖的包写入go.mod文件。
```go
func MasterPriest(cemetery gone.Cemetery) error {
	_ = goner.XormPriest(cemetery) //加载xorm的依赖
	_ = goner.GinPriest(cemetery)  //加载gin的依赖

	_ = Priest(cemetery)
	return nil
}

func main() {
    gone.Run(MasterPriest)
}
```



## 注入依赖
### Spring
在结构体属性上添加`@Autowired`注解，表示该属性是需要依赖注入的。
```java
@Component
public class DemoController {

    @Autowired
    private IDemo demoSvc; //该属性是需要依赖注入的
}
```

### Goner
在结构体属性上添加`gone`标签，表示该属性是需要依赖注入的，可以参考[Gone支持哪些方式注入？](https://goner.fun/zh/guide/goner-inject.html)

```go
type demoController struct {
	gone.Flag
	demoSvc     service.IDemo `gone:"*"` //该属性是需要依赖注入的
}
```


## 配置注入
### Spring
在结构体属性上添加`@Value("${key}")`注解，表示该属性是需要依赖注入的。
```java
@Component
public class UseConfig {
    @Value("${my.conf.int}")
    private Integer int;
}


### Gone
在结构体属性上添加`gone:"config,${key},default=${defaultValue}"`标签，表示该属性是需要依赖注入的，可以参考[通过内置Goners支持配置文件](https://goner.fun/zh/guide/config.html)
```go
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
```


## HTTP 参数注入
HTTP参数注入，就是自动读取HTTP请求的Query参数，并注入到Controller的方法中。

**Gone**支持多种HTTP参数注入，可以取到URL、Header、Body、Cookie、Form、Path等参数，
参考：[HTTP 注入说明](https://goner.fun/zh/references/http-inject.html)

### 注入Query参数
#### Spring
```java
@RestController()
@RequestMapping("/demo")  //路由分组为/demo
public class CallbackController {

    @GetMapping("/hello") //GET方法，当前路由是/demo/hello
    public String hello(
            @RequestParam String name  //注入Query中的name参数
    ) {
        return "hello, " + name;
    }
}
```

#### Gone
```go
type controller struct {
	gone.Flag
	rootRouter gone.RouteGroup `gone:"*"` //注入根路由
}

func (ctr *controller) Mount() gone.GinMountError {
	ctr.rootRouter.
		Group("/demo"). //路由分组为/demo

		//GET 方法
		GET(
			"/hello", // 当前路由是/demo/hello
			func(in struct {
				name string `gone:"http,query"` //注入Query中的name参数
			}) string {
				return "hello, " + in.name
			},
		)

	return nil
}
```

### 注入路径参数
#### Spring
```java
@RestController()
@RequestMapping("/demo")  //路由分组为/demo
public class CallbackController {

    @GetMapping("/hell/{name}")//设置路径模式
    public String demo(
            @PathVariable(value = "name") String name //注入路径参数
    ) {
        return "hello, " + name;
    }
}
```

#### Gone
```go
type controller struct {
	gone.Flag
	rootRouter gone.RouteGroup `gone:"*"` //注入根路由
}

func (ctr *controller) Mount() gone.GinMountError {
	ctr.rootRouter.
		Group("/demo"). //路由分组为/demo

		//GET 方法
		GET(
			"/hello/:name", //设置路径模式
			func(in struct {
				name string `gone:"http,param"` //注入路径参数
			}) string {
				return "hello, " + in.name
			},
		)

	return nil
}
```

### 请求体注入
#### Spring
```java
@RestController()
@RequestMapping("/demo")  //路由分组为/demo
public class CallbackController {

    //订阅接收请求的POJO
    public static class Req {
        private String name;

        public String GetName() {
            return name;
        }

        public void SetName(String name) {
            this.name = name;
        }
    }

    @PostMapping("/hello")
    public String demo(
            @RequestBody Req req //注入请求体
    ) {
        return "hello, " + req.name;
    }
}
```
#### Gone
```go
type controller struct {
	gone.Flag
	rootRouter gone.RouteGroup `gone:"*"` //注入根路由
}

func (ctr *controller) Mount() gone.GinMountError {
	type Req struct {
		Name string `json:"name"`
	}

	ctr.rootRouter.
		Group("/demo").
		POST(
			"/hello/:name", //注入请求体
			func(in struct {
				req Req `gone:"http,body"`
			}) string {
				return "hello, " + in.req.Name
			},
		)

	return nil
}
```

**Gone**支持多种HTTP参数注入，可以取到URL、Header、Body、Cookie、Form、Path等参数，
参考：[HTTP 注入说明](https://goner.fun/zh/references/http-inject.html)

## 总结
**Spring**和**Gone**在依赖模块导入、依赖注入、配置注入以及HTTP参数注入方面有不同的实现方式。

Spring通过项目管理工具（如Maven或Gradle）引入依赖，并自动扫描加载依赖模块。依赖注入使用`@Autowired`注解，配置注入使用`@Value("${key}")`注解，HTTP参数注入则通过`@RequestParam`、`@PathVariable`和`@RequestBody`注解实现。

相对而言，Gone在`MasterPriest`函数中手动加载依赖模块，通过`gone`标签进行依赖和配置注入，并支持多种HTTP参数注入方式（如URL、Header、Body、Cookie、Form、Path等），灵活处理HTTP请求参数。
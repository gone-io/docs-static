---
sidebar: auto
prev: ./gone-tool
next: ./xorm
---

# HTTP 注入说明

## HTTP 依赖注入标签的格式

```
${attributeName} ${attributeType} gone:"http,${kind}=${key}"
```

举例：
```go
router.GET("/search", function(in struct{
    selects []int `gone:"http,query=select"`
}){
    //注入值in.selects为`[]int{1,2,3}`
    fmt.Printf("%v", in.selects)
})
```
上面例子中，
- `selects`为属性名（attributeName）；
- `[]int`为属性类型（attributeType）；
- `query`为注入类型（kind）；
- `select`为注入键值（key）。

## 支持注入的类型和响应标签

|名称|属性类型`${attributeType}`|注入类型`${kind}`|注入键值`${key}`|说明|
|--|--|:--:|:--:|:--|
|**上下文注入**|`gone.Context`|/|/|（不推荐）注入gin请求上下文对象，不需要类型`${kind}`和键值`${key}`。|
|**上下文注入**|`*gone.Context`|/|/|（推荐）注入gin请求上下文指针，不需要类型`${kind}`和键值`${key}`。|
|**请求注入**|`http.Request`|/|/| 不推荐）注入http.Request对象，不需要类型`${kind}`和键值`${key}`。|
|**请求注入**|`*http.Request`|/|/|（推荐）注入http.Request指针，不需要类型`${kind}`和键值`${key}`。|
|**地址注入**|`url.URL`|/|/|（不推荐）注入url.URL，不需要类型`${kind}`和键值`${key}`。|
|**地址注入**|`*url.URL`|/|/|（推荐）注入url.URL指针，不需要类型`${kind}`和键值`${key}`。|
|**请求头注入**|`http.Header`|/|/|（推荐）注入http.Header（请求头），不需要类型`${kind}`和键值`${key}`。|
|**响应注入**|`gone.ResponseWriter`|/|/|注入gin.ResponseWriter（用于直接写入响应数据），不需要类型`${kind}`和键值`${key}`。|
|**Body注入**|结构体、结构体指针|`body`|/|**body注入**；将请求body解析后注入到属性，注入类型为 `body`，不需要“注入键值`${key}`”；框架根据`Content-Type`自动判定是json还是xml等格式；每个请求处理函数只允许存在一个**body注入**。|
|**请求头单值注入**|number \| string|header|缺省取字段名|以键值`${key}`为`key`获取请求头，属性类型支持`string`和`int`,`uint`,`float64`等数字类型，解析不了会返回参数错误|
|**URL参数注入**|number \| string|param|缺省取字段名|以“注入键值`${key}`”为`key`调用函数`ctx.Param(key)`获取Url中定义的参数值，属性类型支持`string`和`int`,`uint`,`float64`等数字类型，解析不了会返回参数错误|
|**Query参数注入**|number \| string \| []number \| []string \| 结构体 \| 结构体指针|query|缺省取字段名|以“注入键值`${key}`”为`key`调用函数`ctx.Query(key)`获取Query中的参数，属性类型支持`string`和`int`,`uint`,`float64`等数字类型，**支持数组<sub>[1]</sub>**，解析不了会返回参数错误|
|**Cookie注入**|number \| string|cookie|缺省取字段名|以“注入键值`${key}`”为`key`调用函数`ctx.Context.Cookie(key)`获取Cookie的值，属性类型支持`string`和`int`,`uint`,`float64`等数字类型，解析不了会返回参数错误|



## 备注
[1]. query参数注入支持数组，举例说明如下：
如果请求的query为`?select=1&select=2&select=3`，下面代码中的 `in.selects` 的值将会为 `[]int{1,2,3}`。
```go
router.GET("/search", function(in struct{
    selects []int `gone:"http,query=select"`
}){
    //注入值in.selects为`[]int{1,2,3}`
    fmt.Printf("%v", in.selects)
})
```

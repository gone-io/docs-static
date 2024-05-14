---
sidebar: auto
prev: ./gone-tool
next: false
---
# HTTP Injection Instructions

## Format of HTTP Dependency Injection Tags

```
${attributeName} ${attributeType} gone:"http,${kind}=${key}"
```

Example:
```go
router.GET("/search", func(in struct{
    selects []int `gone:"http,query=select"`
}){
    // The injected value of in.selects will be `[]int{1,2,3}`
    fmt.Printf("%v", in.selects)
})
```
In the above example:
- `selects` is the attribute name.
- `[]int` is the attribute type.
- `query` is the injection type.
- `select` is the injection key.

## Supported Injection Types and Response Tags

| Name | Attribute Type `${attributeType}` | Injection Type `${kind}` | Injection Key `${key}` | Description |
|--|--|:--:|:--:|:--|
| **Context Injection** | `gone.Context` | / | / | (Not recommended) Injects the gin request context object. `${kind}` and `${key}` are not needed. |
| **Context Injection** | `*gone.Context` | / | / | (Recommended) Injects the gin request context pointer. `${kind}` and `${key}` are not needed. |
| **Request Injection** | `http.Request` | / | / | (Not recommended) Injects the http.Request object. `${kind}` and `${key}` are not needed. |
| **Request Injection** | `*http.Request` | / | / | (Recommended) Injects the http.Request pointer. `${kind}` and `${key}` are not needed. |
| **URL Injection** | `url.URL` | / | / | (Not recommended) Injects the url.URL. `${kind}` and `${key}` are not needed. |
| **URL Injection** | `*url.URL` | / | / | (Recommended) Injects the url.URL pointer. `${kind}` and `${key}` are not needed. |
| **Header Injection** | `http.Header` | / | / | (Recommended) Injects the http.Header (request headers). `${kind}` and `${key}` are not needed. |
| **Response Injection** | `gone.ResponseWriter` | / | / | Injects the gin.ResponseWriter (used to directly write response data). `${kind}` and `${key}` are not needed. |
| **Body Injection** | Struct, Struct Pointer | `body` | / | **Body Injection**; parses the request body and injects it into the attribute. The injection type is `body`, and `${key}` is not needed. The framework automatically determines the format (e.g., JSON, XML) based on `Content-Type`. Only one **body injection** is allowed per request handler. |
| **Single Value Header Injection** | number \| string | header | Defaults to field name | Retrieves the request header with the key `${key}`. Attribute types support `string`, `int`, `uint`, `float64`, etc. If parsing fails, an argument error is returned. |
| **URL Parameter Injection** | number \| string | param | Defaults to field name | Retrieves the URL parameter with the key `${key}` using `ctx.Param(key)`. Attribute types support `string`, `int`, `uint`, `float64`, etc. If parsing fails, an argument error is returned. |
| **Query Parameter Injection** | number \| string \| []number \| []string \| Struct \| Struct Pointer | query | Defaults to field name | Retrieves the query parameter with the key `${key}` using `ctx.Query(key)`. Attribute types support `string`, `int`, `uint`, `float64`, etc., and **supports arrays<sup>[1]</sup>**. If parsing fails, an argument error is returned. |
| **Cookie Injection** | number \| string | cookie | Defaults to field name | Retrieves the cookie with the key `${key}` using `ctx.Context.Cookie(key)`. Attribute types support `string`, `int`, `uint`, `float64`, etc. If parsing fails, an argument error is returned. |

## Notes
[1]. Query parameter injection supports arrays. For example:
If the query is `?select=1&select=2&select=3`, the value of `in.selects` in the code below will be `[]int{1,2,3}`.
```go
router.GET("/search", func(in struct{
    selects []int `gone:"http,query=select"`
}){
    // The injected value of in.selects will be `[]int{1,2,3}`
    fmt.Printf("%v", in.selects)
})
```
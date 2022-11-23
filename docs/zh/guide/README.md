# 指南

## Gone 组件

## Priest 函数

## 微服务组件

### 注册中心接入
### 配置中心接入
### 数据库
### 缓存
### 消息
### 断路器
### 组件开发

## 架构

## 思路

## 流程

## Gone-Tool

### 生成代码：`gone generate`

### 升级到最新: `gone update`

### 生成应用: `gone init`

### 运行测试: `gone test`

## 测试

## 注释增强

### Gone 组件标记：`//go:gone`

### Gone controller 标记: `//go:gone-controller`

### Gone 路由标记: `//go:gone-rest-uri`

```go
//go:gone-controller
type controller struct {

}

//go:gone-rest-uri(path=,method=)
func(*controller) test() string {

}

```

### Gone 测试组件标记: `//go:gone-test`

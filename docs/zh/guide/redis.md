---
sidebar: auto
prev: ./auto-gen-priest
next: false
---

# 利用redis提供分布式锁和分布式缓存
在本文中，我们将分享在gone中如何使用分布式缓存和分布式锁，其中分布式锁中实现了一种较为自由的处理方式———“智能锁”，对一个处理函数进行上锁，函数执行中会周期性检测锁过期的剩余时间并自动给锁续期，函数执行完后会自动解锁。


## 第一步：将redis相关Goner埋葬到Cemetery
> 什么是 Goner？
> 什么是 埋葬？
> 什么是 Cemetery？
> 参考 [Gone的核心概念](https://goner.fun/zh/guide/core-concept.html)

在Priest函数中增加`_ = goner.RedisPriest(cemetery)`，如下：

```go
func priest(cemetery gone.Cemetery) error {

	//使用 goner.RedisPriest 函数，将 redis 相关的Goner 埋葬到 Cemetery 中
	_ = goner.RedisPriest(cemetery)

	cemetery.Bury(&redisUser{})
	return nil
}
```

## 第二步：在配置文件中增加redis相关配置
创建配置文件 `config/default.properties`，内容如下：
```properties
# redis服务地址，格式为 `host:port`
redis.server=localhost:6379

# redis服务密码，不配置默认为空
redis.password=
```
> 其中，redis服务地址需要改你能访问到的redis服务地址。

更多配置：
- `redis.max-idle`：最大空闲链接数，不配置默认为2
- `redis.max-active`：最大活跃链接数，不配置默认为10
- `redis.db`：使用的db，不配置默认为0
- `redis.cache.prefix`：key前缀，如果设置了，对redis的增删改查都会拼接该前缀，拼接方式`${prefix}#${key}`；默认为空

> 关于配置文件，更多参考：[通过内置Goners支持配置文件](https://goner.fun/zh/guide/config.html)

## 第三步，使用redis

### 注入接口
在需要使用的结构体中注入 接口`redis.redis.Cache`和 `redis.Locker`，他们的`GonerId`分别为：`gone-redis-cache`和`gone-redis-locker`：
```go
type redisUser struct {
	gone.Flag

	cache  redis.Cache  `gone:"gone-redis-cache"`
	locker redis.Locker `gone:"gone-redis-locker"`
}
```

### 使用分布是缓存
请看下面代码中的注释：
```go
func (r *redisUser) UseCache() {
	key := "gone-address"
	value := "https://github.com/gone-io/gone"

	//设置缓存
	err := r.cache.Put(
		key,            //第一个参数为 缓存的key，类型为 `string`
		value,          // 第二参数为 需要缓存的值，类型为any，可以是任意类型；传入的值会被编码为 `[]byte` 发往redis
		10*time.Second, // 第三个参数为 过期时间，类型为 `time.Duration`;省略，表示不设置过期时间
	)

	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}

	//获取缓存
	var getValue string
	err = r.cache.Get(
		key,       //第一个参数为 缓存的key，类型为 `string`
		&getValue, //第二参数为指针，接收获取缓存的值，类型为any，可以是任意类型；从redis获取的值会被解码为传入的指针类型
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	fmt.Printf("getValue:%v", getValue)
}
```
接口上的其他方法：
- `Remove(key string) (err error)`：用于删除redis某个key，支持通配符
- `Keys(key string) ([]string, error)`：使用前缀或者通配符查询存在哪些key，⚠️该方法慎用
- `Prefix() string`：获取当前缓存配置的key前缀

### 使用分布时锁
1. 锁定一段时间
```go
func (r *redisUser) UseLock() {
	lockKey := "gone-lock-key"

	//尝试获取锁 并 锁定一段时间
	//返回的第一个参数为一个解锁的函数
	unlock, err := r.locker.TryLock(
		lockKey,        //第一个参数为 锁的key，类型为 `string`
		10*time.Second, //第二参数为 锁的过期时间，类型为 `time.Duration`
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	//操作完后，需要解锁
	defer unlock()

	//获取锁成功后，可以进行业务操作
	//todo
}
```
> 这种方式，使用锁需要保证在锁定的时间内能够执行完所有操作，否则由于锁过期可能会导致问题。

2. 锁定一个操作，操作没结束会自动给锁续期，操作结束自动解锁
```go
func (r *redisUser) LockFunc() {
	lockKey := "gone-lock-key"
	err := r.locker.LockAndDo(
		lockKey, //第一个参数为 锁的key，类型为 `string`
		func() { //第二个参数为 需要执行的函数，类型为 `func()`，代表一个操作
			//获取锁成功后，可以进行业务操作
			//todo
			println("do some options")
		},
		100*time.Second, //第三个参数为 锁的过期时间，类型为 `time.Duration`;第一次加锁和后续锁续期都将使用该值
		5*time.Second,   //第四个参数为 锁续期的间隔时间，类型为 `time.Duration`;周期性检查所是否将过期，如果在下个周期内会过期则对锁续期
	)
	if err != nil {
		fmt.Printf("err:%v", err)
	}
}
```
这种方式比较智能，姑且将其称为“智能锁”吧！
推荐使用这种方式，可以无脑使用，降低使用的心智负担。

## 上面例子完整代码
例子的源代码可以在[这里](https://github.com/gone-io/gone/tree/main/example/use-redis)找到

```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner"
	"github.com/gone-io/gone/goner/redis"
	"time"
)

func priest(cemetery gone.Cemetery) error {

	//使用 goner.RedisPriest 函数，将 redis 相关的Goner 埋葬到 Cemetery 中
	_ = goner.RedisPriest(cemetery)

	cemetery.Bury(&redisUser{})
	return nil
}

type redisUser struct {
	gone.Flag

	cache  redis.Cache  `gone:"gone-redis-cache"`
	locker redis.Locker `gone:"gone-redis-locker"`
}

func (r *redisUser) UseCache() {
	key := "gone-address"
	value := "https://github.com/gone-io/gone"

	//设置缓存
	err := r.cache.Put(
		key,            //第一个参数为 缓存的key，类型为 `string`
		value,          // 第二参数为 需要缓存的值，类型为any，可以是任意类型；传入的值会被编码为 `[]byte` 发往redis
		10*time.Second, // 第三个参数为 过期时间，类型为 `time.Duration`;省略，表示不设置过期时间
	)

	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}

	//获取缓存
	var getValue string
	err = r.cache.Get(
		key,       //第一个参数为 缓存的key，类型为 `string`
		&getValue, //第二参数为指针，接收获取缓存的值，类型为any，可以是任意类型；从redis获取的值会被解码为传入的指针类型
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	fmt.Printf("getValue:%v", getValue)
}

func (r *redisUser) LockTime() {
	lockKey := "gone-lock-key"

	//尝试获取锁 并 锁定一段时间
	//返回的第一个参数为一个解锁的函数
	unlock, err := r.locker.TryLock(
		lockKey,        //第一个参数为 锁的key，类型为 `string`
		10*time.Second, //第二参数为 锁的过期时间，类型为 `time.Duration`
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	//操作完后，需要解锁
	defer unlock()

	//获取锁成功后，可以进行业务操作
	//todo
}

func (r *redisUser) LockFunc() {
	lockKey := "gone-lock-key"
	err := r.locker.LockAndDo(
		lockKey, //第一个参数为 锁的key，类型为 `string`
		func() { //第二个参数为 需要执行的函数，类型为 `func()`，代表一个操作
			//获取锁成功后，可以进行业务操作
			//todo
			println("do some options")
		},
		100*time.Second, //第三个参数为 锁的过期时间，类型为 `time.Duration`;第一次加锁和后续锁续期都将使用该值
		5*time.Second,   //第四个参数为 锁续期的间隔时间，类型为 `time.Duration`;周期性检查所是否将过期，如果在下个周期内会过期则对锁续期
	)
	if err != nil {
		fmt.Printf("err:%v", err)
	}
}

func main() {
	gone.Prepare(priest).AfterStart(func(in struct {
		r *redisUser `gone:"*"`
	}) {
		in.r.UseCache()
		in.r.LockTime()
	}).Run()
}

```
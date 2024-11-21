---
sidebar: auto
prev: ./xorm
next: ./
---

# `goner/redis` 使用说明

## import 和 bury
- import
```go
import "github.com/gone-io/gone/goner/redis"
```
- bury
```go
//使用 goner.RedisPriest 函数，将 redis 相关的Goner注册到Gone
_ = goner.RedisPriest(cemetery)
```

## 配置项
- redis.server： redis服务器地址，例如：127.0.0.1:6379，无默认值
- redis.password：redis密码，允许为空
- redis.max-idle：最大空闲链接数，不配置默认为2
- redis.max-active：最大活跃链接数，不配置默认为10
- redis.db：使用的db，不配置默认为0
- redis.cache.prefix：key前缀，如果设置了，对redis的增删改查都会拼接该前缀，拼接方式${prefix}#${key}；默认为空



## 使用分布是缓存 redis.Cache
### 接口定义
```go
type Cache interface {
    //设置缓存，Set的别名
	Put(key string, value any, ttl ...time.Duration) error

    //设置缓存
	Set(key string, value any, ttl ...time.Duration) error

    //获取缓存
	Get(key string, value any) error

    //删除缓存
	Remove(key string) (err error)

    //根据模式获取缓存的key
	Keys(pattern string) ([]string, error)

	//获取当前Cache使用的前缀
	Prefix() string
}
```

### 使用示例
```go
type redisUser struct {
	gone.Flag

	cache  redis.Cache  `gone:"gone-redis-cache"`
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
```

## 使用分布式锁 redis.Locker

### 接口定义
```go
// Locker redis 分布式缓存
type Locker interface {
	//TryLock 尝试将key锁定一段时间，成功返回一个解锁函数，失败返回错误
	TryLock(key string, ttl time.Duration) (unlock Unlock, err error)

	//LockAndDo 尝试获取锁，并执行fn函数，函数未执行完自动续期，函数执行完后自动释放锁
	LockAndDo(key string, fn func(), lockTime, checkPeriod time.Duration) (err error)
}
```
### 使用示例
```go
type redisUser struct {
	gone.Flag
	locker redis.Locker `gone:"gone-redis-locker"`
}

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

## 操作Key，使用 redis.Key
### 接口定义
```go
type Key interface {
	//Expire 给key设置一段时间后过期
	Expire(key string, ttl time.Duration) error

	//ExpireAt 设置key在某个时间点过期
	ExpireAt(key string, time time.Time) error

	//Ttl 获取key的过期时间
	Ttl(key string) (time.Duration, error)

	//Del 删除一个key
	Del(key string) (err error)

	//Incr 使key自增一个量
	Incr(field string, increment int64) (int64, error)

	//Keys 根据模式获取缓存的key
	Keys(pattern string) ([]string, error)

	//Prefix 获取redis配置的key前缀
	Prefix() string
}
```


## 使用 Provider 注入 redis 接口
通过标签 `gone:"gone-redis-provider,${key}`使用redis Provider 创建一个接口给注入属性。支持注入的接口包括前面的`redis.Cache`、`redis.Locker`、`redis.Key`；另外还支持注入 `redis.Hash`接口，用于操作redis hash。

Hash接口定义
```go
type Hash interface {
    //设置hash字段
	Set(field string, v interface{}) (err error)
    //获取hash字段
	Get(field string, v interface{}) error

    //删除hash字段
	Del(field string) error

    //扫描hash字段
	Scan(func(field string, v []byte)) error

    //hash字段自增
	Incr(field string, increment int64) (int64, error)
}
```

### 使用示例

1. 使用 Provider 创建一个redis.Cache接口，该缓存接口的前缀将使用配置中的前缀拼接${key}得到新的前缀，可以用于有按模块隔离的场景。
如果配置了`redis.cache.prefix=member`，那么下面注入的`redis.Cache`接口将使用的前缀为：`member#points`；执行操作`r.redis.Set("use-110", "value")`操作，保存到redis中的key为：`member#points#use-110`。

```go
type redisUser struct {
    gone.Flag
    redis redis.Cache `gone:"gone-redis-provider,points"`
}

func (r *redisUser) UseProvidedCache() {
    r.redis.Set("use-110", "value")
}
```
redis.Locker 和 redis.Key 接口的注入 与 redis.Cache 接口类似。


2. 从配置文件中读取一个值作为前缀来拼接
如果配置了`redis.cache.prefix=order` 和 `app.order.sell.redis-prefix=sell`，下面注入的接口将使用的前缀为：`order#sell`；执行操作`r.redis.Set("use-110", "value")`操作，保存到redis中的key为：`order#sell#use-110`。


```go
type redisUser struct {
    gone.Flag
    redis redis.Cache `gone:"gone-redis-provider,config=app.order.sell.redis-prefix"` //读取配置中的 app.order.sell.redis-prefix 的值用于创建 redis.Cache
}

func (r *redisUser) UseProvidedCache() {
    r.redis.Set("use-110", "value")
}
```
redis.Locker 和 redis.Key 接口的注入 与 redis.Cache 接口类似。

3. 使用 `redis.Hash` 接口
在注入`redis.Hash`接口时，key不在为前缀，而就是当前redis要操作的key。

如果配置了`redis.cache.prefix=user`，下面代码中的`r.hash.Set("use-110", "value")`将会被翻译为指令：`HSET user-set use-110 value`。
```go
type redisUser struct {
    gone.Flag
    hash redis.Hash `gone:"gone-redis-provider,user-set"`
}
func (r *redisUser) UseHash() {
    r.hash.Set("use-110", "value")
}
```


## 直接使用redis连接池
### 接口定义
```go
type Pool interface {
	//获取链接
    Get() Conn

    //释放链接
	Close(conn redis.Conn)
}
```

### 使用示例
```go
type redisUser struct {
    gone.Flag
    pool redis.Pool `gone:"gone-redis-pool"`
}

func (r *redisUser) UsePool() {
    conn := r.pool.Get()
    defer r.pool.Close(conn)

    //执行redis命令
    _, err := conn.Do("SET", "key", "value")
}
```
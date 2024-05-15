---
sidebar: auto
prev: ./auto-gen-priest
next: false
---
# Using Redis for Distributed Locking and Caching

In this article, we will share how to use distributed caching and distributed locking in Gone, where distributed locking includes a more flexible handling method — "smart lock". This method locks a processing function, periodically checks the remaining expiration time of the lock during function execution, and automatically renews the lock if necessary. The function automatically unlocks after execution.

## Step 1: Embedding Redis Related Goner into Cemetery
> What is a Goner?
> What does it mean to bury?
> What is a Cemetery?
> Refer to [Core Concepts of Gone](https://goner.fun/guide/core-concept.html)

In the Priest function, add `_ = goner.RedisPriest(cemetery)` as follows:

```go
func priest(cemetery gone.Cemetery) error {

	// Using the goner.RedisPriest function to bury Redis-related Goner into Cemetery
	_ = goner.RedisPriest(cemetery)

	cemetery.Bury(&redisUser{})
	return nil
}
```

## Step 2: Adding Redis Configuration to the Configuration File
Create a configuration file `config/default.properties` with the following contents:
```properties
# Redis service address in the format `host:port`
redis.server=localhost:6379

# Redis service password, default is empty if not configured
redis.password=
```
> Note: The Redis service address should be set to a Redis service you can access.

Additional configuration options:
- `redis.max-idle`: maximum number of idle connections, default is 2 if not set
- `redis.max-active`: maximum number of active connections, default is 10 if not set
- `redis.db`: the database to use, default is 0 if not set
- `redis.cache.prefix`: key prefix, if set, all CRUD operations on Redis will append this prefix using the format `${prefix}#${key}`; default is empty

> For more on configuration files, refer to: [Support for Configuration Files Through Built-in Goners](https://goner.fun/guide/config.html)

## Step 3: Using Redis

### Injecting Interfaces
Inject the interfaces `redis.Cache` and `redis.Locker` into the structure where they are needed, their `GonerId` are respectively: `gone-redis-cache` and `gone-redis-locker`:
```go
type redisUser struct {
	gone.Flag

	cache  redis.Cache  `gone:"gone-redis-cache"`
	locker redis.Locker `gone:"gone-redis-locker"`
}
```

### Using Distributed Cache
Refer to the comments in the code below:
```go
func (r *redisUser) UseCache() {
	key := "gone-address"
	value := "https://github.com/gone-io/gone"

	// Setting the cache
	err := r.cache.Put(
		key,            // The first parameter is the cache key, type `string`
		value,          // The second parameter is the value to cache, type any; the passed value will be encoded to `[]byte` and sent to Redis
		10*time.Second, // The third parameter is the expiration time, type `time.Duration`; if omitted, no expiration time is set
	)

	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}

	// Getting the cache
	var getValue string
	err = r.cache.Get(
		key,       // The first parameter is the cache key, type `string`
		&getValue, // The second parameter is a pointer to receive the cached value, type any; the value retrieved from Redis will be decoded into the type of the passed pointer
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	fmt.Printf("getValue:%v", getValue)
}
```
Other methods on the interface:
- `Remove(key string) (err error)`: used to delete a specific Redis key, supports wildcard
- `Keys(key string) ([]string, error)`: used to find keys using a prefix or wildcard, ⚠️ use this method with caution
- `Prefix() string`: get the current cache configuration's key prefix

### Using Distributed Lock
1. Locking for a specific duration
```go
func (r *redisUser) UseLock() {
	lockKey := "gone-lock-key"

	// Attempt to acquire the lock and lock it for a duration
	// The first returned parameter is a function to unlock
	unlock, err := r.locker.TryLock(
		lockKey,        // The first parameter is the lock key, type `string`
		10*time.Second, // The second parameter is the lock's expiration time, type `time.Duration`
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	// After operations, you need to unlock
	defer unlock()

	// Once the lock is acquired,business operations can be performed.
	//todo
}

2. Locking a function where the lock is automatically renewed if the operation does not finish, and it unlocks automatically once the operation is complete
```go
func (r *redisUser) LockFunc() {
	lockKey := "gone-lock-key"
	err := r.locker.LockAndDo(
		lockKey, // The first parameter is the lock key, type `string`
		func() { // The second parameter is the function to be executed, type `func()`, representing an operation
			// Once the lock is acquired, business operations can be performed
			//todo
			println("do some options")
		},
		100*time.Second, // The third parameter is the lock's expiration time, type `time.Duration`; both the initial locking and subsequent renewals will use this value
		5*time.Second,   // The fourth parameter is the interval for lock renewal, type `time.Duration`; periodically checks if the lock is about to expire, and renews the lock if it is within the next period
	)
	if err != nil {
		fmt.Printf("err:%v", err)
	}
}
```
This approach is quite intelligent and is referred to as a “smart lock.” It is recommended for its ease of use and reduction in cognitive load.

## Complete Example Code
The source code for the example can be found [here](https://github.com/gone-io/gone/tree/main/example/use-redis)

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

	// Using the goner.RedisPriest function to embed Redis-related Goner into the Cemetery
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

	// Setting the cache
	err := r.cache.Put(
		key,            // The first parameter is the cache key, type `string`
		value,          // The second parameter is the value to cache, type any; the passed value will be encoded to `[]byte` and sent to Redis
		10*time.Second, // The third parameter is the expiration time, type `time.Duration`; if omitted, no expiration time is set
	)

	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}

	// Getting the cache
	var getValue string
	err = r.cache.Get(
		key,       // The first parameter is the cache key, type `string`
		&getValue, // The second parameter is a pointer to receive the cached value, type any; the value retrieved from Redis will be decoded into the type of the passed pointer
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	fmt.Printf("getValue:%v", getValue)
}

func (r *redisUser) LockTime() {
	lockKey := "gone-lock-key"

	// Attempting to obtain the lock and lock it for a specific duration
	// The first returned parameter is a function to unlock
	unlock, err := r.locker.TryLock(
		lockKey,        // The first parameter is the lock key, type `string`
		10*time.Second, // The second parameter is the lock's expiration time, type `time.Duration`
	)
	if err != nil {
		fmt.Printf("err:%v", err)
		return
	}
	// After operations, you need to unlock
	defer unlock()

	// Once the lock is acquired, business operations can be performed
	//todo
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
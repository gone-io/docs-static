---
sidebar: auto
prev: ./inner-goner
next: ./xorm
---
# Configuring with Built-in Goners Support

[[toc]]

Gone provides a method to read configuration files using the built-in Goners. Currently, the configuration file format is only supported in `.properties`.

## Example
> You can find the source code of the example [here](https://github.com/gone-io/gone/tree/main/example/use-config).

### 1. Create a mod
```bash
go mod init use-config
```

### 2. Add a configuration file
```bash
mkdir config
touch config/default.properties
```
The content of the `config/default.properties` file is as follows:
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

### 3. Add code
```bash
touch main.go
```

The content of the `main.go` file is as follows:
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
	printInt *int          `gone:"config,my.conf.int8"` // pointer to int
	float64  float64       `gone:"config,my.conf.float64"`
	string   string        `gone:"config,my.conf.string"`
	bool     bool          `gone:"config,my.conf.bool"`
	duration time.Duration `gone:"config,my.conf.duration"`
	defaultV string        `gone:"config,my.conf.default,default=ok"`

	sub *SubConf `gone:"config,my.conf.sub"` // pointer to struct

	subs []SubConf `gone:"config,my.conf.subs"` // array
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

### 4. Run
```bash
go mod tidy
go run main.go
```
The output will be as follows:
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

## Configuration Injection
As seen from the example, configuration items can also be "dependency injected" into Goners.

### Tag Format Used
The tag format for configuration injection is as follows:
```
gone:"config,${key},default=${defaultValue}"
```

::: tip Explanation:
1. The tag name remains `gone`.
2. `config` is a fixed value, indicating that the property is a configuration.
3. `${key}` represents the key in the configuration file.
4. `default=${defaultValue}` is used to specify a default value, which can be omitted; `${defaultValue}` is the default value. If no default value is specified and the corresponding key is missing in the configuration file, an error will be raised.
:::

### Supported Data Types for Injection
> In the [Core Concepts - Goners](https://goner.fun/guide/core-concept.html#goner-%E9%80%9D%E8%80%85), we mentioned that Goners can be injected into properties of other structures. Here, configuration, as a special case, can also be injected into properties of other structures. Its implementation is through [Vampire](https://goner.fun/guide/core-concept.html#%F0%9F%A7%9B%F0%9F%8F%BB%E2%80%8D%E2%99%80%EF%B8%8Fvampire), if interested, you can refer to [this part of the source code](https://github.com/gone-io/gone/tree/v0.1.5/goner/config).

The supported types for properties are listed below:
1. Basic types
   - Boolean: bool
   - Integer types: int, int64, int32, int16, int8
   - Unsigned integer types: uint, uint64, uint32, uint16, uint8
   - Floating-point types: float64, float32
   - String type: string

::: tip
For integer types and unsigned integer types, be cautious of the range they represent. If the number is too large, overflow may occur; for example, `int8` represents the range `-128` to `127`, so if a value larger than 127 is assigned, overflow will occur (assigning 128 will result in -128).
:::

2. time.Duration
For convenient time parsing, `time.Duration` type is supported in the configuration, and the following units can be used:
   - ns: nanoseconds
   - us: microseconds
   - ms: milliseconds
   - s: seconds
   - m: minutes
   - h: hours

In the example, `my.conf.duration=10h` represents 10 hours; `1h10m10s` represents 1 hour, 10 minutes, and 10 seconds.

::: tip
Implementation uses `time.ParseDuration`, so you can refer to: [https://pkg.go.dev/time#ParseDuration](https://pkg.go.dev/time#ParseDuration).
:::

3. Struct types
In the example, the type of the configuration struct is provided. It needs to adhere to the following rules:
   - The properties in the struct to be configured must be public, i.e., starting with a capital letter.
   - Use the `properties` tag to specify the name of the property.
   - Supports nesting.

Explanation: In the example, the property `sub` of `UseConfig` reads the configuration key `my.conf.sub`; the type of `sub` is `SubConf`, and the property `X` is marked with the configuration name `properties:"x"`, so the value of `sub.X` will be read from the configuration item `my.conf.sub.x`.

4. Array types
Configuration injection supports the Slice type, and currently, the elements of the Slice support structs and pointers to structs. The key format for configuration is as follows:
```ini
${injectConfigkey}[${index}].${structAttributeName}
```
::: tip Explanation
   - `${injectConfigkey}` is the key of the item to be injected.
   - `${index}` is the array index.
   - `${structAttributeName}` is the value annotated on the property of the injected struct with the `properties` tag.
:::

5. Pointer types
Supports pointer types for injected properties.

### Configuration Files

#### Configuration File Directory
The directory where configuration files are stored is determined by three parts:
1. The executable file and the current working directory of the program.
2. Relative configuration directory
   The relative configuration directory defaults to `config`, and can be changed by passing the `--conf $configDir` parameter during startup.

For example, if the compiled gone program is saved as `/app/gone-app`, and we run it from the `/home/degfy` directory:
```bash
cd /home/degfy/
/app/gone-app
```
And if the relative configuration directory is not modified by passing parameters, the configuration directory for the program would be:
- /app/config
- /home/degfy/config

#### Default Configuration File Path
Continuing from the previous example, the paths for configuration files would be:
- /app/config/default.properties
- /home/degfy/config/default.properties
These configuration files contain default configurations that do not change with the environment.

#### Environment-specific Configuration File Paths
During development, we typically use environment-specific configurations, such as:
- local: Local development environment
- dev: Development environment online
- test: Testing environment online
- prod: Production environment

We can specify the current environment by setting the `ENV` environment variable or passing the `--env $env` parameter during startup. If neither is set, the default environment is `local`.
Continuing from the previous example, the configuration files related to the environment would be:
- /app/config/local.properties
- /home/degfy/config/local.properties

#### Configuration Loading Order
As mentioned earlier, there are four configuration files when the program is started, and they are loaded in the following order:
1. /app/config/default.properties
2. /app/config/local.properties
3. /home/degfy/config/default.properties
4. /home/degfy/config/local.properties

If the same configuration item exists in multiple files, the value from the file loaded later will override the value from the file loaded earlier. That is, environment-specific configurations override default configurations, and configurations from the current running directory override those from the program directory.

::: tip Best Practices
1. Put all configurations in the default configuration file and override them in environment-specific configuration files as needed.
2. Design configurations with minimalism in mind and consider using a "convention over configuration" approach, where default values are provided whenever possible.
3. To make the code "ready out of the box," it's recommended to set up a complete configuration in `local.properties` so that the program can run without any additional configuration, facilitating smooth startup for other team members who clone the codebase.
:::
---
sidebar: auto
prev: ./
next: ./http-inject
---

# gone 辅助工具

## 安装
执行如下命令：
```bash
go install github.com/gone-io/gonectr@latest
go install go.uber.org/mock/mockgen@latest
```

## 使用

### 测试是否正常安装
成功安装后，执行`gonectr -h`，建获得如下结果：
```bash
➜ gonectr -h
gonectr is a command-line tool designed for generating Gone projects
and serving as a utility for Gone projects, such as code generation,
compilation, and running Gone projects.

Usage:
  gonectr [flags]
  gonectr [command]

Available Commands:
  build       build gone project
  completion  Generate the autocompletion script for the specified shell
  create      Create a new Gone Project
  generate    generate gone loading code and import code
  help        Help about any command
  mock        generate mock goner code for interface
  priest      generate priest function
  run         run gone project

Flags:
  -h, --help      help for gonectr
  -v, --version   Show version

Use "gonectr [command] --help" for more information about a command.
```

### 生成项目
**命令格式：**
```bash
gonectr create [-t ${template} [-m ${modName}]] ${appName}
```
**参数说明:**
- `-t`: 指定模板，默认为`web`，支持的模板类型如下：
  - web：生成空白的web项目
  - web+mysql：生成web项目，并集成mysql
- `-m`: 指定项目模块名称，默认为项目名
- `appName`: 指定项目名，默认为demo

例子可以参考[快速开始#Web 项目](https://goner.fun/zh/quick-start/web.html)


### 生成Priest函数【废弃中】
该命令的作用是扫描代码中的特殊注释`//go:gone`，生成一个**Priest**函数，将其标注的New函数生成的**Goner**注册到Gone中。
> 关于**Priest**函数、**Goner**的详细介绍，请参考[Gone的核心概念](https://goner.fun/zh/guide/core-concept.html)。

**命令格式：**
```bash
gonectr priest -s ${scanPackageDir} -p ${pkgName} -f ${funcName} -o ${outputFilePath} [-w] [--stat]
```

**参数说明:**
- `-s`: 指定扫描的包路径，不可缺省
- `-p`: 指定生成代码的包名，不可缺省
- `-f`: 指定生成Priest函数的名称，不可缺省
- `-o`: 指定生成Priest函数的输出文件路径，不可缺省
- `-w`: 监听文件变化，自动生成，默认为`false`
- `--stat`: 输出统计信息，默认为`false`

例子可以参考[自动生成Priest](https://goner.fun/zh/guide/auto-gen-priest.html)

### 使用`gonectr mock`生成Mock代码
该命令依赖`go.uber.org/mock/mockgen`，需要先安装mockgen（`go install go.uber.org/mock/mockgen@latest`）。该命令会调用`mockgen`，生成mock代码，然后再将将生成的mock代码标记为Gone，使其可以注入到Gone项目中。


**命令格式：**
```bash
➜ gonectr mock -h
generate mock goner code for interface

Usage:
  gonectr mock [flags]

Flags:
  -d, --destination string   mock代码生成目录
  -h, --help                 help for mock
  -p, --package string       生成代码所在package名
  -s, --scan-dir string      将扫描的目录，接口定义文件所在的目录
```

例子可以参考[单元测试](https://goner.fun/zh/guide/unit-test.html)
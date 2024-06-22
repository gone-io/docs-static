---
sidebar: auto
prev: ./
next: ./http-inject
---

# gone 辅助工具

## 安装
执行如下命令：
```bash
go install github.com/gone-io/gone/tools/gone@latest
```

## 使用

### 测试是否正常安装
成功安装后，执行`gone -h`，建获得如下结果：
```bash
➜  demo gone -h
NAME:
   gone - A new cli application

USAGE:
   gone [global options] command [command options] [arguments...]

DESCRIPTION:
   generate gone code or generate gone app

COMMANDS:
   priest   -s ${scanPackageDir} -p ${pkgName} -f ${funcName} -o ${outputFilePath} [-w]
   mock     -f ${fromGoFile} -o ${outGoFile}
   create   [-t ${template} [-m ${modName}]] ${appName}
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h  show help (default: false)
```

### 生成项目
**命令格式：**
```bash
gone create [-t ${template} [-m ${modName}]] ${appName}
```
**参数说明:**
- `-t`: 指定模板，默认为`web`，支持的模板类型如下：
  - web：生成空白的web项目
  - web+mysql：生成web项目，并集成mysql
- `-m`: 指定项目模块名称，默认为项目名
- `appName`: 指定项目名，默认为demo

例子可以参考[快速开始#Web 项目](https://goner.fun/zh/quick-start/web.html)


### 生成Priest函数
该命令的作用是扫描代码中的特殊注释`//go:gone`，生成一个**Priest**函数，将其标注的New函数生成的**Goner**注册到Gone中。
> 关于**Priest**函数、**Goner**的详细介绍，请参考[Gone的核心概念](https://goner.fun/zh/guide/core-concept.html)。

**命令格式：**
```bash
gone priest -s ${scanPackageDir} -p ${pkgName} -f ${funcName} -o ${outputFilePath} [-w] [--stat]
```

**参数说明:**
- `-s`: 指定扫描的包路径，不可缺省
- `-p`: 指定生成代码的包名，不可缺省
- `-f`: 指定生成Priest函数的名称，不可缺省
- `-o`: 指定生成Priest函数的输出文件路径，不可缺省
- `-w`: 监听文件变化，自动生成，默认为`false`
- `--stat`: 输出统计信息，默认为`false`

例子可以参考[自动生成Priest](https://goner.fun/zh/guide/auto-gen-priest.html)

### 生成Mock代码
该命令用于给工具**mockgen**生成的Mock代码进行处理，给mock结构体嵌入`gone.Flag`，使其mock生成的值为**Goner**。

**命令格式：**
```bash
gone mock -f ${fromGoFile} -o ${outGoFile}
```

**参数说明:**
- `-f`: 指定要处理的go文件路径，不可缺省
- `-o`: 指定输出文件路径，不可缺省

支持管道符号，例如：
```bash
mockgen -package=gin -source=../cmux/interface.go -mock_names=Server=CmuxServer -|gone mock -o cumx_Server_mock_test.go
```
例子可以参考[单元测试](https://goner.fun/zh/guide/unit-test.html)
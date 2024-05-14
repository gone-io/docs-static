---
sidebar: auto
---

# gone辅助工具

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

### 生成Priest函数
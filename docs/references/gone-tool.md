---
sidebar: auto
prev: false
next: ./http-inject
---

# Gone Tool

## Installation
Run the following command:
```bash
go install github.com/gone-io/gone/tools/gone@latest
```

## Usage

### Testing Installation
After successful installation, run `gone -h` to verify the installation. You should see the following output:
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

### Generate Project

### Generate Priest Function
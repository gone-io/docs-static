---
sidebar: auto
prev: false
next: ./http-inject
---

# Gone Tool

## Installation
Run the following command:
```bash
go install github.com/gone-io/gonectr@latest
go install go.uber.org/mock/mockgen@latest
```

## Usage

### Testing Installation
After successful installation, run `gone -h` to verify the installation. You should see the following output:
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

### Generate Project
```bash
➜ gonectr create -h
Create a new Gone Project

Usage:
  gonectr create [flags]

Flags:
  -h, --help                   help for create
  -m, --module-name string     module name
  -t, --template-name string   support template names: web, web+mysql (default "web")
```
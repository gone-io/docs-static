---
sidebar: auto
prev: false
next: ./mysql
---

# Web 项目

## 安装 [gonectr](https://github.com/gone-io/gonectr) 和 [mockgen](https://github.com/uber-go/mock/tree/main)

```bash
go install github.com/gone-io/gonectr@latest
go install go.uber.org/mock/mockgen@latest
```

## 创建一个项目

```bash
gonectr create myproject
```

## 运行项目

```bash
cd myproject
gonectr run ./cmd/server
```

或者，使用make命令运行，如果你已经安装[make](https://www.gnu.org/software/make/):

```bash
cd myproject
make run
```

或者使用docker compose来运行:

```bash
cd myproject
docker compose build
docker compose up
```
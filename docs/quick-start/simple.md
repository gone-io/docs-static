---
sidebar: auto
prev: false
next: ./mysql
---

# Creating a Simple Web Project

## Installing [gonectr](https://github.com/gone-io/gonectr) and [mockgen](https://github.com/uber-go/mock)
```bash
go install github.com/gone-io/gonectr@latest
go install go.uber.org/mock/mockgen@latest
```



## Creating a Web Project
```bash
gonectr create myproject
```

## Running the Project
```bash
cd myproject
gonectr run ./cmd/server
```

Or use run Make command if you have installed [make](https://www.gnu.org/software/make/):
```bash
cd myproject
make run
```
Or with docker compose:
```bash
cd myproject
docker compose build
docker compose up
```
---
sidebar: auto
prev: false
next: ./quick-start/
---
# Introduction

## What is Gone?
Firstly, **Gone** is a lightweight **dependency injection framework** based on **Golang**, inspired by Java's Spring Framework. Secondly, the **Gone** framework includes a series of built-in components that provide a comprehensive web development solution, offering capabilities commonly used in microservices such as service configuration, logging, service invocation, database access, and message middleware.

Let's use **Gone** to write a web service!

## Web Service
```go
package main

import (
	"fmt"
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner"
)

// Implement a Goner. What is a Goner? => https://goner.fun/en/guide/core-concept.html#goner
type controller struct {
	gone.Flag // Goner flag, anonymously embedded, making the struct a Goner
	gone.RouteGroup `gone:"gone-gin-router"` // Inject root router
}

// Implement the Mount method to mount routes. The framework will automatically execute this method.
func (ctr *controller) Mount() gone.GinMountError {

	// Define request structure
	type Req struct {
		Msg string `json:"msg"`
	}

	// Register handler for `POST /hello`
	ctr.POST("/hello", func(in struct {
		to  string `gone:"http,query"` // Inject http request query parameter `to`
		req *Req   `gone:"http,body"`  // Inject http request body
	}) any {
		return fmt.Sprintf("to %s msg is: %s", in.to, in.req.Msg)
	})

	return nil
}

func main() {
	// Start the service
	gone.Serve(func(cemetery gone.Cemetery) error {
		// Invoke the framework's built-in component to load the gin framework
		_ = goner.GinPriest(cemetery)

		// Bury a Goner of type controller into the cemetery
		// What does bury mean? => https://goner.fun/en/guide/core-concept.html#bury
		// What is a cemetery? => https://goner.fun/en/guide/core-concept.html#cemetery
		cemetery.Bury(&controller{})
		return nil
	})
}
```
Run the above code with: `go run main.go`. The program will listen on port `8080`. Test using curl:
```bash
curl -X POST 'http://localhost:8080/hello' \
    -H 'Content-Type: application/json' \
    --data-raw '{"msg": "Hello there?"}'
```
The result is:
```bash
{"code":0,"data":"to  msg is: Hello there?"}
```

## Concepts
> The code we write is ultimately lifeless unless it is run.

In Gone, components are abstracted as **Goner**. A **Goner** can have other **Goners** injected into it. Before starting Gone, all **Goners** need to be **buried** in the **cemetery**. After starting Gone, all **Goners** will be **resurrected**, forming a **Heaven** where "everyone is complete, and what they desire will be fulfilled".

To learn more, please read [Gone's core concepts](https://goner.fun/en/guide/core-concept.html).
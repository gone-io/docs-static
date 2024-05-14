---
sidebar: auto
prev: ./xorm
next: ./logrus
---
# Gone's Hook Functions

## What are Hook Functions?
In the process of starting and stopping Gone, support is provided to register four types of functions that will be executed at specific times, known as Hook functions:
- BeforeStart Hook function: Executes before Gone starts, registered using `BeforeStart`.
- AfterStart Hook function: Executes after Gone starts, registered using `AfterStart`.
- BeforeStop Hook function: Executes before Gone stops, registered using `BeforeStop`.
- AfterStop Hook function: Executes after Gone stops, registered using `AfterStop`.

## Code Example

```go
package main

import "github.com/gone-io/gone"

type Worker struct {
	gone.Flag
	Name string
}

type Boss struct {
	gone.Flag
	Name string
}

func main() {
	gone.
		Prepare(func(cemetery gone.Cemetery) error {
			cemetery.Bury(&Boss{Name: "Jim"}, "boss-jim")
			cemetery.Bury(&Worker{Name: "Bob"}, "worker-bob")
			return nil
		}).
		BeforeStart(func() {
			println("First BeforeStart function")
		}).
		BeforeStart(func(in struct {
			worker Worker `gone:"worker-bob"`
			boss   Boss   `gone:"*"`
		}) {
			println("Second BeforeStart function")
			println("Boss:", in.boss.Name)
			println("Worker:", in.worker.Name)
		}).
		BeforeStart(func() error {
			println("Third BeforeStart function")
			return nil
		}).
		Run()
}
```

The output of the above code is as follows:
```
Third BeforeStart function
Second BeforeStart function
Boss: Jim
Worker: Bob
First BeforeStart function
```

### Rules for Hook Functions
1. Multiple registrations of the same type of Hook function are allowed.
2. For `BeforeStart` and `BeforeStop` Hook functions, the ones registered later are executed first.
3. For `AfterStart` and `AfterStop` Hook functions, the ones registered earlier are executed first.
4. Hook functions can be registered using the `Preparer` object returned by `gone.Prepare(priest)`, supporting chaining.
5. The types of functions that can be registered with the `Preparer` object include:
    - **Input Parameters:**
        - No parameters
        - Anonymous struct parameters, with properties annotated with `gone` tags automatically injected with corresponding values.
    - **Return Parameters:**
        - No return parameters
        - `error` parameter; if the error parameter is not `nil`, the program will panic when it reaches the Hook, terminating execution.

## Gone's Startup Process

1. Revive all **buried** Goners.
2. Execute the `AfterRevive` method of all prophet Goners.
3. Register the `Start` method of **angels** as BeforeStart Hook functions and the `Stop` method as BeforeStop Hook functions.
4. Register Hook functions for business code.
5. Execute BeforeStart Hook functions in order.
6. Execute AfterStart Hook functions in order.
7. Wait for the program to end.
8. Execute BeforeStop Hook functions in order.
9. Execute AfterStop Hook functions in order.
---
sidebar: auto
prev: false
next: ./gone-and-inject
---
# Core Concepts of Gone

"Our code, after all, is just lifeless matter, unless it's resurrected in **Heaven**; for that, we need to **bury** it in a **Cemetery**."

## Goner
In the Gone framework, the most fundamental and core concept is **Goner**, which refers to a structure anonymously embedded with `gone.Flag`. For example:
```go
type Worker struct {
	gone.Flag
}
```

Goner serves as a component in the Gone framework and is crucial for implementing dependency injection:
1. A Goner can be injected as a property into other structures.
2. The properties of a Goner can be injected into other types.

The reason for embedding a `gone.Flag` is to limit the scope of dependency injection, ensuring that injection occurs only among Goners, thereby providing a unified pattern for component implementation in the Gone framework.

::: tip
Below is the source code for Goner and gone.Flag:
```go
type Flag struct{}

func (g *Flag) goneFlag() {}

//...

// Goner represents the deceased.
type Goner interface {
	goneFlag()
}
```
As an interface, Goner demands that objects implementing it have a private method `goneFlag()`. Due to Go's visibility restrictions, it's not possible to implement the internally defined private method `goneFlag()` outside the `github.com/gone-io/gone` package. Therefore, a structure can only become a Goner by embedding `gone.Flag`. This might be a bit complex, but essentially, it means that implementing Goner can only be achieved by embedding `gone.Flag`, not by directly implementing the `goneFlag()` method.
:::

::: tip
When referring to multiple Goners, we use the plural form **Goners**.
:::

The Gone framework also includes three special types of Goners:

### 🔮 Prophet
A special type of **Goner** that implements the **`AfterRevive() AfterReviveError`** method on regular **Goners**; **Prophet**'s **AfterRevive** is executed after a **Goner** is resurrected.

The Prophet interface is defined as follows:
```go
// Prophet represents the prophet.
type Prophet interface {
	Goner
	// AfterRevive is executed after the Goner is revived.
	AfterRevive() AfterReviveError
}
```

### 😇 Angel
A special type of **Goner** possessing the angelic powers of **`Start(Cemetery) error`** on its left wing and **`Stop(Cemetery) error`** on its right wing, responsible for initiating (allocating resources, starting a service) and terminating (stopping a service, reclaiming resources) tasks, respectively.

The Angel interface is defined as follows:
```go
type Angel interface {
	Goner
	Start(Cemetery) error
	Stop(Cemetery) error
}
```

### 🧛🏻‍♀️ Vampire
A special type of **Goner** with a unique ability — sucking with **`Suck(conf string, v reflect.Value) SuckError`**. **Suck** enables injecting values that are not Goners into Goners' properties.

The Vampire interface is defined as follows:
```go
type SuckError error
type Vampire interface {
	Goner
	Suck(conf string, v reflect.Value) SuckError
}
```

## Cemetery
Cemetery is used to manage Goners, primarily providing methods for **Burying** and **Reviving** Goners. Its interface is defined as follows:
```go
type Cemetery interface {
	// ... Other methods
	Goner
	Bury(Goner, ...GonerId) Cemetery  // Burying a Goner in the Cemetery

	// ReviveAllFromTombs revives all Goners.
	ReviveAllFromTombs() error

	//...
}
```
From the code, it's evident that Cemetery itself is a Goner, automatically buried and resurrected when the Gone framework starts.

### Burying
Burying a Goner in a Cemetery means registering the Goner with the framework for later property injection. In code implementation, **Bury** is a public method of **Cemetery**, typically called through the **Priest** function.

### Reviving
Reviving entails completing the injection of properties required by a Goner. In the `ReviveAllFromTombs() error` function, all Goners buried in the Cemetery are attempted to be revived. If any property injection fails, the program panics.
::: tip
After reviving all Goners, **ReviveAllFromTombs** calls the **AfterRevive** method of all **Prophets**.
:::

## Heaven
Heaven represents a Gone program, responsible for managing the program's startup, shutdown, and associated processes (resurrection completed before startup). It facilitates executing certain hook tasks before and after startup and before program termination. Heaven accepts a priest function to begin its operation, as shown below:
```go
package main

import "github.com/gone-io/gone"

func Priest(cemetery gone.Cemetery) error {
	// Call cemetery.Bury to bury Goners
	// Or call other Priest functions
	// TODO
	return nil
}

func main(){
	gone.Run(Priest)
}
```

Or:
```go
package main

import "github.com/gone-io/gone"

func Priest(cemetery gone.Cemetery) error {
	// Call cemetery.Bury to bury Goners
	// Or call other Priest functions
	// TODO
	return nil
}

func main(){
	gone.
		Prepare(Priest).
		AfterStart(func(){
			//TODO: Perform operations after startup
		}).
		Run()
}
```

## Priest
Priest is a function responsible for burying Goners in the Cemetery. Its definition is as follows:
```go
type Priest func(cemetery Cemetery) error
```

In the implementation of the **Priest** function, you can call **cemetery.Bury** to accomplish this, as shown below:
```go
type Worker struct {
	gone.Flag
	Name string
}

type Boss struct {
	gone.Flag
	Name string
}

func aPriest(cemetery gone.Cemetery) error {
	cemetery.Bury(&Boss{Name: "Jim"}, "boss-jim")
	cemetery.Bury(&Worker{Name: "Bob"}, "worker-bob")

	// Anonymous burial, not specifying the GonerId of the buried Goner
	cemetery.Bury(&Worker{Name: "X"})
	return nil
}
//...
```
Alternatively, you can accomplish this by calling other **Priest** functions:
```go
func a1Priest(cemetery gone.Cemetery) error {
	//todo
	return nil
}

func a2Priest(cemetery gone.Cemetery) error {
	//todo
	return nil
}

func aPriest(cemetery gone.Cemetery) error {
	_ = a1Priest(cemetery)
	_ = a2Priest(cemetery)
	//todo
	return nil
}
```
If we develop a component package where multiple **Goners** are used to accomplish various functionalities, and we need to **bury** these **Goners** simultaneously when using them, we can write a **Priest** function to facilitate bulk **burying** of these **Goners** in business code.

That's exactly what we do with the built-in component package of the framework. Here's how it's done, along with the [code](https://github.com/gone-io/gone/blob/main/goner/priest.go) and [documentation](https://goner.fun/goners/#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AEgoners).

Additionally, we've developed a command-line utility called **gone**, which scans for special comments `//go:gone` to automatically generate **Priest** functions. You can refer to [Auto-generating Priest](./auto-gen-priest.md) for more information.
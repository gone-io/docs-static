---
sidebar: auto
prev: ./mysql
next: ./
---

# 封装一个Goner调用GPT
下面例子的代码已经开源在：https://github.com/gone-io/gpt；如果需要，可以导入使用：`go get -u github.com/gone-io/gpt`。

## 定义用于依赖注入的接口
```go
type ChatGPT interface {
	CreateCompletion(
		ctx context.Context,
		request openai.CompletionRequest,
	) (response openai.CompletionResponse, err error)

	CreateChatCompletion(
		ctx context.Context,
		request openai.ChatCompletionRequest,
	) (response openai.ChatCompletionResponse, err error)
}
```



## 实现这个接口并嵌入`gone.Flag`

```go
type chatGPTClient struct {
	gone.Flag
	*openai.Client
}
```
上面代码，通过嵌入`*openai.Client`，实现了`ChatGPT`接口，同时通过嵌入`gone.Flag`实现了Goner接口，使得这个结构体可以注入到依赖注入中。

## 设计配置项
- `openai.base`：配置OpenAI的API地址
- `openai.token`：配置OpenAI的API密钥

我们希望可以将这两个配置注入到我们实现的`chatGPTClient`结构体中，如下：
```go
type chatGPTClient struct {
	gone.Flag
	*openai.Client

	//从配置文件中注入`openai.base`配置项
	openaiBase string `gone:"config,openai.base"`

	//从配置文件中注入`openai.token`配置项
	openaiToken string `gone:"config,openai.token"`
}
```

## 使chatGPTClient实现接口`AfterRevive() error`函数，称为“先知”
`AfterRevive`方法会在`gone`框架初始化时调用，用于初始化`chatGPTClient`结构体中的`*openai.Client`字段。
```go
func (g *chatGPTClient) AfterRevive() error {
	conf := openai.DefaultConfig(g.openaiToken)
	conf.BaseURL = g.openaiBase
	g.Client = openai.NewClientWithConfig(conf)
	return nil
}
```

好了，到此我们就基本完成了我们的目标：封装一个Goner用于调用GPT。

但是为了方便用户使用我们还需要做下面工作。

## 方便用户使用

1. 定义用于注入的键值，方便用户按GonerId注入
我们这里定义为：`gone-gpt`

2. 为了方便用户注册这个Goner，我们定义一个开放的New函数
```go
// NewChatGPTClient returns a new Goner which is ChatGPT client.
func NewChatGPTClient() (gone.Goner, gone.GonerId) {
	return &chatGPTClient{}, "gone-gpt"
}
```

3. 前面我们用到了配置注入，我们实际上依赖了Gone框架中的配置模块，我们希望用户在注册我们定义chatGPTClient时能顺便将配置相关的Goner也注册了，所以我们再定义一个Priest函数，如下：
```go
// Priest 用于注册chatGPTClient和其依赖的Goner
func Priest(cemetery gone.Cemetery) error {

	//使用config.Priest来注册Gone配置模块相关的Goner
	_ = config.Priest(cemetery)

	//注册chatGPTClient
	cemetery.Bury(NewChatGPTClient())
	return nil
}
```

## 完整的疯转代码如下
文件名：gpt.go
```go
package gpt

import (
	"context"
	"github.com/gone-io/gone"
	"github.com/gone-io/gone/goner/config"
	"github.com/sashabaranov/go-openai"
)

type ChatGPT interface {
	CreateCompletion(
		ctx context.Context,
		request openai.CompletionRequest,
	) (response openai.CompletionResponse, err error)

	CreateChatCompletion(
		ctx context.Context,
		request openai.ChatCompletionRequest,
	) (response openai.ChatCompletionResponse, err error)
}

// NewChatGPTClient returns a new Goner which is ChatGPT client.
func NewChatGPTClient() (gone.Goner, gone.GonerId) {
	return &chatGPTClient{}, "gone-gpt"
}

// Priest 用于注册chatGPTClient和其依赖的Goner
func Priest(cemetery gone.Cemetery) error {

	//使用config.Priest来注册Gone配置模块相关的Goner
	_ = config.Priest(cemetery)

	//注册chatGPTClient
	cemetery.Bury(NewChatGPTClient())
	return nil
}

type chatGPTClient struct {
	gone.Flag
	*openai.Client

	//从配置文件中注入`openai.base`配置项
	openaiBase string `gone:"config,openai.base"`

	//从配置文件中注入`openai.token`配置项
	openaiToken string `gone:"config,openai.token"`
}

func (g *chatGPTClient) AfterRevive() error {
	conf := openai.DefaultConfig(g.openaiToken)
	conf.BaseURL = g.openaiBase
	g.Client = openai.NewClientWithConfig(conf)
	return nil
}
```

## 编写测试
建立测试文件： `gpt_test.go`
内容如下：
```go
package gpt

import (
	"github.com/gone-io/gone"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestPriest(t *testing.T) {
	gone.Test(func(gpt *chatGPTClient) {
		assert.NotNil(t, gpt.Client)
	}, Priest)
}
```
实际上，我们的封装只是做了对openai.Client的初始化，我们只需要测试配置是否正确即可。

## 使用和编写示例
1. 在配置文件中，写入配置项，参考[通过内置Goners支持配置文件](https://goner.fun/zh/guide/config.html)
2. 在需要使用的结构体中注入ChatGPT并调用相关接口，代码示例如下：

```go
package example

import (
	"context"
	"github.com/gone-io/gone"
	"github.com/gone-io/gpt"
	"github.com/sashabaranov/go-openai"
)

type Chat struct {
	gone.Flag
	gPT gpt.ChatGPT `gone:"gone-gpt"`
}

func (c *Chat) Use(ask string) error {
	response, err := c.gPT.CreateChatCompletion(context.TODO(), openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleSystem,
				Content: "you are a helpful chatbot",
			},
			{
				Role:    openai.ChatMessageRoleUser,
				Content: ask,
			},
		},
	})
	if err != nil {
		return err
	}

	println(response.Choices[0].Message.Content)
	return nil
}
```


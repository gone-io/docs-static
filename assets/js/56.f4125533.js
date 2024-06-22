(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{345:function(t,s,a){"use strict";a.r(s);var n=a(10),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"日志输出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#日志输出"}},[t._v("#")]),t._v(" 日志输出")]),t._v(" "),s("p",[t._v("在Gone中，提供了一个内置Goner用于日志输出——"),s("a",{attrs:{href:"github.com/gone-io/gone/tree/main/goner/logrus"}},[t._v("logrus")]),t._v("，是通过将"),s("code",[t._v("github.com/sirupsen/logrus")]),t._v("包封装为Goner实现的。希望有小伙伴封装其他的日志输出包，提供更多的日志解决方法。")]),t._v(" "),s("h2",{attrs:{id:"将相关goners注册到gone"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#将相关goners注册到gone"}},[t._v("#")]),t._v(" 将相关Goners注册到Gone")]),t._v(" "),s("blockquote",[s("p",[t._v("tip: 了解Gone的核心概念和术语请阅读："),s("a",{attrs:{href:"https://goner.fun/zh/guide/core-concept.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gone的核心概念"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("在这里，我们采用"),s("code",[t._v("github.com/gone-io/gone/tree/main/goner")]),t._v("包中的 "),s("strong",[s("code",[t._v("LogrusLoggerPriest")])]),t._v(" 来完成相关Goners的注册。在"),s("code",[t._v("LogrusLoggerPriest")]),t._v("中同时被注册的还包括配置和tracer相关的Goners，这三个包一般一起使用。")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("MasterPriest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" goner"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("LogrusLoggerPriest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//注册其他Goners")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//todo ...")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"在配置文件中添加相关配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在配置文件中添加相关配置"}},[t._v("#")]),t._v(" 在配置文件中添加相关配置")]),t._v(" "),s("blockquote",[s("p",[t._v("tip: "),s("a",{attrs:{href:"https://goner.fun/zh/guide/config.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("通过内置Goners支持配置文件"),s("OutboundLink")],1)])]),t._v(" "),s("p",[s("strong",[t._v("支持的配置项")])]),t._v(" "),s("ul",[s("li",[s("p",[t._v("log.level，日志级别，默认为info；支持的级别：")]),t._v(" "),s("ul",[s("li",[t._v("panic")]),t._v(" "),s("li",[t._v("fatal")]),t._v(" "),s("li",[t._v("error")]),t._v(" "),s("li",[t._v("warn 或者 warning")]),t._v(" "),s("li",[t._v("info")]),t._v(" "),s("li",[t._v("debug")]),t._v(" "),s("li",[t._v("trace")])])]),t._v(" "),s("li",[s("p",[t._v("log.report-caller，如果为true日志将打印调用日志输出位置的文件名和行号,例如：")]),t._v(" "),s("p",[t._v("2024-05-11 09:09:57.784|INFO|"),s("strong",[t._v("/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.1.4/goner/gin/server.go:46")]),t._v("|061ad00f-8c0d-479c-bc4c-393e0cf2cca2|Server Listen At :8080")])]),t._v(" "),s("li",[s("p",[t._v("log.output，日志输出的位置，默认为stdout（标准输出），支持stderr 和 一个文件路径")]),t._v(" "),s("blockquote",[s("p",[s("strong",[t._v("最佳实践：")]),t._v(" 将应用部署在容器中，日志直接输出到标准输出，由收集组件采集日志，比较成熟的方法比如EFK")])])])]),t._v(" "),s("h2",{attrs:{id:"打印日志"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#打印日志"}},[t._v("#")]),t._v(" 打印日志")]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v("Info")]),t._v("方法打印日志：")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" service "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    gone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n    log logrus"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Logger "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"gone-logger"`')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//具名注入到 嵌套的log属性上")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("svc "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("service"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Business")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//打印日志")]),t._v("\n\tsvc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Infof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"input content is %s"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" input"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" input"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n")])])]),s("p",[t._v("其他级别的日志打印，参考接口代码:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Logger 日志接口")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Logger "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Tracef")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Debugf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Infof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Printf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Warnf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Warningf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Errorf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatalf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Panicf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("format "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Trace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Debug")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Info")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Warn")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Warning")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Panic")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Traceln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Debugln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Infoln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Println")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Warnln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Warningln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Errorln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Fatalln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Panicln")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"日志的格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#日志的格式"}},[t._v("#")]),t._v(" 日志的格式")]),t._v(" "),s("p",[s("code",[t._v("${日志输出时间}|${日志级别}|${打印日志的源代码位置}|${TraceId}|${日志内容}")])]),t._v(" "),s("p",[t._v("例如：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("2024-05-11 09:09:57.784|INFO|**/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.1.4/goner/gin/server.go:46**|061ad00f-8c0d-479c-bc4c-393e0cf2cca2|Server Listen At :8080\n")])])]),s("h2",{attrs:{id:"关于traceid"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#关于traceid"}},[t._v("#")]),t._v(" 关于TraceId")]),t._v(" "),s("p",[t._v("在web应用中，我们希望有一个统一的编号来标识同一请求产生的日志。这个统一的Id，就是TraceId，如果有这个Id，排查问题时，我们只需要使用这个Id搜索日志，就可以获取请求的所有日志。")]),t._v(" "),s("h2",{attrs:{id:"使用goner-zap输出日志"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用goner-zap输出日志"}},[t._v("#")]),t._v(" 使用"),s("code",[t._v("goner/zap")]),t._v("输出日志")]),t._v(" "),s("p",[t._v("在v1.x版本中，我们提供了"),s("code",[t._v("goner/zap")]),t._v("包，可以替换"),s("code",[t._v("goner/logrus")]),t._v("包，输出日志。\n"),s("code",[t._v("goner/zap")]),t._v(" 封装了"),s("a",{attrs:{href:"https://github.com/uber-go/zap",target:"_blank",rel:"noopener noreferrer"}},[t._v("zap"),s("OutboundLink")],1),t._v("包，并实现了"),s("code",[t._v("goner.Logger")]),t._v("接口，可以更高效的输出日志，并且支持更多自定义。")]),t._v(" "),s("p",[t._v("具体使用参考："),s("a",{attrs:{href:"https://goner.fun/zh/references/1-zap.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("goner/zap 使用说明"),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=r.exports}}]);
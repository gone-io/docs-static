(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{323:function(t,e,s){"use strict";s.r(e);var a=s(10),n=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"trace-log-with-traceid"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#trace-log-with-traceid"}},[t._v("#")]),t._v(" Trace Log with traceId")]),t._v(" "),e("p",[t._v("In web applications, a single request may go through many business processes. To facilitate troubleshooting, we want all logs generated by different business processes to have a unified traceId. Having a traceId allows us to link all logs related to the entire business process, making it easier to trace and analyze where problems occur in the business flow.")]),t._v(" "),e("p",[t._v("In other open-source frameworks, it's generally recommended to pass a "),e("code",[t._v("context.Context")]),t._v(" parameter to "),e("strong",[t._v("all")]),t._v(" functions, which is also recommended by the official Golang documentation. However, we believe that adding this extra parameter to every function is burdensome. We aim to avoid passing additional parameters to every function just to print a traceId in logs. Therefore, in Gone, we provide a built-in Goner to achieve this functionality.")]),t._v(" "),e("h2",{attrs:{id:"burying-related-goners-in-the-cemetery"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#burying-related-goners-in-the-cemetery"}},[t._v("#")]),t._v(" Burying Related Goners in the Cemetery")]),t._v(" "),e("blockquote",[e("p",[t._v("tip: To understand the core concepts and terminology of Gone, please read: "),e("a",{attrs:{href:"https://goner.fun/en/guide/core-concept.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Core Concepts of Gone"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("Here, we use the "),e("strong",[e("code",[t._v("BasePriest")])]),t._v(" from the package "),e("strong",[e("code",[t._v("github.com/gone-io/gone/tree/main/goner")])]),t._v(" to bury related Goners. In the "),e("code",[t._v("BasePriest")]),t._v(", Goners related to "),e("code",[t._v("tracer")]),t._v(", "),e("code",[t._v("config")]),t._v(", and "),e("code",[t._v("logrus")]),t._v(" are all buried into the Cemetery, as these three packages are commonly used together.")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("MasterPriest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" goner"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("BasePriest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Bury other Goners")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"simple-usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#simple-usage"}},[t._v("#")]),t._v(" Simple Usage")]),t._v(" "),e("p",[t._v("When the tracer is buried, when we print logs using the injected "),e("code",[t._v("logrus.Logger")]),t._v(" interface, a traceId will automatically be added to the logs.")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" service "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n    log logrus"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Logger "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"gone-logger"`')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Named injection into nested log attributes")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("svc "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("service"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Business")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Print log")]),t._v("\n\tsvc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Infof")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"input content is %s"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" input"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" input"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n")])])]),e("p",[t._v("For example, the "),e("code",[t._v("061ad00f-8c0d-479c-bc4c-393e0cf2cca2")]),t._v(" is the traceId:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("2024-05-11 09:09:57.784|INFO|**/Users/jim/go/pkg/mod/github.com/gone-io/gone@v0.1.4/goner/gin/server.go:46**|061ad00f-8c0d-479c-bc4c-393e0cf2cca2|Server Listen At :8080\n")])])]),e("h2",{attrs:{id:"passing-traceid-across-goroutines"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#passing-traceid-across-goroutines"}},[t._v("#")]),t._v(" Passing TraceId Across Goroutines")]),t._v(" "),e("p",[t._v("In the previous example, it's normal if no new goroutines are used. If a new goroutine is started using the "),e("code",[t._v("go")]),t._v(" keyword, it will be noticed that the logs printed by the goroutine do not have a traceId. To solve this, inject the "),e("code",[t._v("tracer.Tracer")]),t._v(" interface and use the "),e("code",[t._v("Go")]),t._v(" method instead of the "),e("code",[t._v("go")]),t._v(" keyword to start a new goroutine.")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" service "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n    log logrus"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Logger "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"gone-logger"`')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Named injection into nested log attributes")]),t._v("\n    tracer"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Tracer "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"gone-tracer"`')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Inject tracer")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("svc "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("service"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Business")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\tsvc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Go")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Print log in a new goroutine")]),t._v("\n\t\tsvc"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("log"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Infof")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"log in new goroutine"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" input"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n")])])]),e("h2",{attrs:{id:"passing-traceid-across-processes-services"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#passing-traceid-across-processes-services"}},[t._v("#")]),t._v(" Passing TraceId Across Processes/Services")]),t._v(" "),e("p",[t._v("In microservices, a web request typically spans multiple microservices. Cross-service communication is generally done through:")]),t._v(" "),e("ol",[e("li",[t._v("Message middleware\nTo facilitate the passing of traceId in the message middleware and to facilitate the use of the message middleware to pass business events, we have open-sourced the "),e("a",{attrs:{href:"https://github.com/gone-io/emitter",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/gone-io/emitter"),e("OutboundLink")],1),t._v(" repository. In this repository, we have implemented an adapter for "),e("strong",[t._v("Rocket MQ")]),t._v(", and plan to adapt to other mainstream message middleware such as "),e("strong",[t._v("Kafka")]),t._v(" and "),e("strong",[t._v("RabbitMQ")]),t._v(" in the future.")]),t._v(" "),e("li",[t._v("RPC calls/internal http calls\nUse the built-in Goner "),e("a",{attrs:{href:"https://github.com/gone-io/gone/tree/main/goner/urllib",target:"_blank",rel:"noopener noreferrer"}},[t._v("urllib"),e("OutboundLink")],1),t._v(" to send http requests to Gone Web programs, and the traceId will be automatically passed between services. Additionally, using the built-in "),e("a",{attrs:{href:"https://github.com/gone-io/gone/tree/main/goner/grpc",target:"_blank",rel:"noopener noreferrer"}},[t._v("grpc"),e("OutboundLink")],1),t._v(" to implement gRPC calls will also automatically pass the traceId. More RPC call support will be provided in the future.")])]),t._v(" "),e("h2",{attrs:{id:"multi-language-support"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#multi-language-support"}},[t._v("#")]),t._v(" Multi-language Support")]),t._v(" "),e("p",[t._v("To pass the traceId in an HTTP request, a special header "),e("code",[t._v("X-Trace-ID")]),t._v(' is added to carry the traceId. Therefore, if multiple programming languages are used, as long as the different services follow the rule of "attaching '),e("code",[t._v("X-Trace-ID")]),t._v(" when making requests on the client side and parsing "),e("code",[t._v("X-Trace-ID")]),t._v(' when processing requests on the server side," traceId can be seamlessly passed across services developed in different languages.'),e("br"),t._v("\nWe plan to develop packages in other languages to seamlessly integrate with other languages in the future.")])])}),[],!1,null,null,null);e.default=n.exports}}]);
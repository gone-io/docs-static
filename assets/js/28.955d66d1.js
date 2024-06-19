(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{313:function(t,s,n){"use strict";n.r(s);var e=n(10),a=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),s("h2",{attrs:{id:"what-is-gone"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#what-is-gone"}},[t._v("#")]),t._v(" What is Gone?")]),t._v(" "),s("p",[t._v("Firstly, "),s("strong",[t._v("Gone")]),t._v(" is a lightweight "),s("strong",[t._v("dependency injection framework")]),t._v(" based on "),s("strong",[t._v("Golang")]),t._v(", inspired by Java's Spring Framework. Secondly, the "),s("strong",[t._v("Gone")]),t._v(" framework includes a series of built-in components that provide a comprehensive web development solution, offering capabilities commonly used in microservices such as service configuration, logging, service invocation, database access, and message middleware.")]),t._v(" "),s("p",[t._v("Let's use "),s("strong",[t._v("Gone")]),t._v(" to write a web service!")]),t._v(" "),s("h2",{attrs:{id:"web-service"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-service"}},[t._v("#")]),t._v(" Web Service")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" main\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fmt"')]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/gone-io/gone"')]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/gone-io/gone/goner"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Implement a Goner. What is a Goner? => https://goner.fun/en/guide/core-concept.html#goner")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" controller "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Goner flag, anonymously embedded, making the struct a Goner")]),t._v("\n\tgone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RouteGroup "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"gone-gin-router"`')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Inject root router")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Implement the Mount method to mount routes. The framework will automatically execute this method.")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("controller"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" gone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GinMountError "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Define request structure")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Req "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tMsg "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`json:"msg"`')]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Register handler for `POST /hello`")]),t._v("\n\tctr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("POST")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("in "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tto  "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"http,query"`')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Inject http request query parameter `to`")]),t._v("\n\t\treq "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("Req   "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"http,body"`')]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Inject http request body")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" any "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" fmt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sprintf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"to %s msg is: %s"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" in"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" in"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("req"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Msg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Start the service")]),t._v("\n\tgone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Serve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Invoke the framework's built-in component to load the gin framework")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" goner"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GinPriest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Bury a Goner of type controller into the cemetery")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// What does bury mean? => https://goner.fun/en/guide/core-concept.html#bury")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// What is a cemetery? => https://goner.fun/en/guide/core-concept.html#cemetery")]),t._v("\n\t\tcemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bury")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("controller"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Run the above code with: "),s("code",[t._v("go run main.go")]),t._v(". The program will listen on port "),s("code",[t._v("8080")]),t._v(". Test using curl:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-X")]),t._v(" POST "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:8080/hello'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-H")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type: application/json'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --data-raw "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{"msg": "Hello there?"}\'')]),t._v("\n")])])]),s("p",[t._v("The result is:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"code"')]),t._v(":0,"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"data"')]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"to  msg is: Hello there?"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"concepts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#concepts"}},[t._v("#")]),t._v(" Concepts")]),t._v(" "),s("blockquote",[s("p",[t._v("The code we write is ultimately lifeless unless it is run.")])]),t._v(" "),s("p",[t._v("In Gone, components are abstracted as "),s("strong",[t._v("Goner")]),t._v(". A "),s("strong",[t._v("Goner")]),t._v(" can have other "),s("strong",[t._v("Goners")]),t._v(" injected into it. Before starting Gone, all "),s("strong",[t._v("Goners")]),t._v(" need to be "),s("strong",[t._v("buried")]),t._v(" in the "),s("strong",[t._v("cemetery")]),t._v(". After starting Gone, all "),s("strong",[t._v("Goners")]),t._v(" will be "),s("strong",[t._v("resurrected")]),t._v(", forming a "),s("strong",[t._v("Heaven")]),t._v(' where "everyone is complete, and what they desire will be fulfilled".')]),t._v(" "),s("p",[t._v("To learn more, please read "),s("a",{attrs:{href:"https://goner.fun/en/guide/core-concept.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gone's core concepts"),s("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);s.default=a.exports}}]);
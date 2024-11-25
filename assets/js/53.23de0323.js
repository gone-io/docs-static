(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{344:function(t,s,n){"use strict";n.r(s);var a=n(10),e=Object(a.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"如何使用内置goners"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何使用内置goners"}},[t._v("#")]),t._v(" 如何使用内置Goners?")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#内置goners"}},[t._v("内置Goners")])]),s("li",[s("a",{attrs:{href:"#使用-goner-priest-注册goners"}},[t._v("使用goner.*Priest注册Goners")])]),s("li",[s("a",{attrs:{href:"#使用-gone-标记依赖"}},[t._v("使用gone标记依赖")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"内置goners"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内置goners"}},[t._v("#")]),t._v(" 内置Goners")]),t._v(" "),s("p",[t._v("为了降低Gone的使用门槛，我们开发了一些 "),s("RouterLink",{attrs:{to:"/zh/goners/#框架内置goners"}},[t._v("内置Goners")]),t._v(" ，用于快速开发，比如提供Web服务、提供数据库连接、提供redis连接、提供定时任务等。")],1),t._v(" "),s("h2",{attrs:{id:"使用goner-priest注册goners"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用goner-priest注册goners"}},[t._v("#")]),t._v(" 使用"),s("code",[t._v("goner.*Priest")]),t._v("注册Goners")]),t._v(" "),s("p",[t._v("比如，通过 "),s("code",[t._v("goner.GinPriest")]),t._v(" 注册 Web服务依赖的Goners：")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Priest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过 `goner.GinPriest` 注册 Web服务依赖的Goners：")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" goner"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GinPriest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 注册其他依赖的Goners")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 启动服务")]),t._v("\n\tgone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Serve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Priest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"使用gone标记依赖"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用gone标记依赖"}},[t._v("#")]),t._v(" 使用"),s("code",[t._v("gone")]),t._v("标记依赖")]),t._v(" "),s("p",[t._v("比如，编写Web服务的Controller是注入"),s("code",[t._v("goner/gin")]),t._v("提供的"),s("code",[t._v("gin.RouteGroup")]),t._v("接口：")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" controller "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n\trouter gin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RouteGroup "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gone:"*"`')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//注册 gin 的默认路由分组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 实现 goner/gin 中定义的 Controller 接口，用于挂载路由")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("controller"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Mount")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" gin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MountError "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 定义 GET /ping 的处理函数")]),t._v("\n\tctr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("router"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GET")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/ping"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("gin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);
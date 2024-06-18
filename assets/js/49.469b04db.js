(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{365:function(e,t,r){"use strict";r.r(t);var o=r(10),v=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"goners-组件库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#goners-组件库"}},[e._v("#")]),e._v(" Goners（组件库）")]),e._v(" "),t("h2",{attrs:{id:"核心级goners"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#核心级goners"}},[e._v("#")]),e._v(" 核心级Goners")]),e._v(" "),t("blockquote",[t("p",[e._v("核心组件也是Goner，可以被其他Goner注入，这部分Goners，是Gone运行的基础，是Gone运行不可或缺的部分。")])]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("接口名")]),e._v(" "),t("th",[e._v("实现")]),e._v(" "),t("th",[e._v("GoneId")]),e._v(" "),t("th",[e._v("功能介绍")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[t("a",{attrs:{href:"https://pkg.go.dev/github.com/gone-io/gone#Heaven",target:"_blank",rel:"noopener noreferrer"}},[e._v("Heaven"),t("OutboundLink")],1)]),e._v(" "),t("td",[t("a",{attrs:{href:"https://github.com/gone-io/gone/blob/12ea8e3577fbed493766f522ab002136edf3805d/heaven.go#L65",target:"_blank",rel:"noopener noreferrer"}},[e._v("heaven"),t("OutboundLink")],1)]),e._v(" "),t("td",[e._v("gone-heaven")]),e._v(" "),t("td",[e._v("负责将Goner从cemetery中复活，执行安装的Hook函数，管理框架的启停流程和状态。")])]),e._v(" "),t("tr",[t("td",[t("a",{attrs:{href:"https://pkg.go.dev/github.com/gone-io/gone#Cemetery",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cemetery"),t("OutboundLink")],1)]),e._v(" "),t("td",[t("a",{attrs:{href:"https://github.com/gone-io/gone/blob/12ea8e3577fbed493766f522ab002136edf3805d/cemetery.go#L17",target:"_blank",rel:"noopener noreferrer"}},[e._v("cemetery"),t("OutboundLink")],1)]),e._v(" "),t("td",[e._v("gone-cemetery")]),e._v(" "),t("td",[e._v("管理Goners，提供将Goner埋葬的Bury方法；依赖注入的逻辑主要在该结构体中实现。")])])])]),e._v(" "),t("h2",{attrs:{id:"框架内置goners"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#框架内置goners"}},[e._v("#")]),e._v(" 框架内置Goners")]),e._v(" "),t("p",[e._v("框架内置Goners，是为丰富Gone的功能而开发的，比如支持Web开发、支持数据库连接、支持Redis等…"),t("br"),e._v("\n代码实现在 "),t("a",{attrs:{href:"https://github.com/gone-io/gone/tree/v0.1.4/goner",target:"_blank",rel:"noopener noreferrer"}},[e._v("goner目录"),t("OutboundLink")],1),e._v("，该目录下的每个子目录分别实现了一个gone的特性，每个特性包含一个或多个Goner的定义和实现。")]),e._v(" "),t("p",[e._v("为了方便使用，我们在 "),t("a",{attrs:{href:"https://github.com/gone-io/gone/blob/v0.1.4/goner/priest.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("goner/priest.go"),t("OutboundLink")],1),e._v(" 中定义了"),t("code",[e._v("Priest")]),e._v("函数，可以按功能直接批量埋葬相关Goners。")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("目录/组件")]),e._v(" "),t("th",[e._v("实现功能")]),e._v(" "),t("th",[e._v("文档")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("config")]),e._v(" "),t("td",[e._v("读取config目录下的配置文件，允许配置项注入到Goner")]),e._v(" "),t("td",[t("RouterLink",{attrs:{to:"/zh/guide/config.html"}},[e._v("通过内置Goners支持配置文件")])],1)]),e._v(" "),t("tr",[t("td",[e._v("logrus")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/sirupsen/logrus")]),e._v("，提供日志打印相关的方法，支持将日志按格式打印")]),e._v(" "),t("td",[t("RouterLink",{attrs:{to:"/zh/guide/logrus.html"}},[e._v("日志打印")])],1)]),e._v(" "),t("tr",[t("td",[e._v("tracer")]),e._v(" "),t("td",[e._v("日志追踪，提供traceId；在处理同一请求时，日志打印可以拥有相同的traceId")]),e._v(" "),t("td",[t("RouterLink",{attrs:{to:"/zh/guide/tracer.html"}},[e._v("使用traceId追踪日志")])],1)]),e._v(" "),t("tr",[t("td",[e._v("gin")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/gin-gonic/gin")]),e._v("，使gone支持web开发")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("xorm")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("xorm.io/xorm")]),e._v("，用于操作数据")]),e._v(" "),t("td",[t("RouterLink",{attrs:{to:"/zh/guide/xorm.html"}},[e._v("通过内置Goners支持数据库连接")])],1)]),e._v(" "),t("tr",[t("td",[e._v("redis")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/gomodule/redigo/redis")]),e._v("，用于操作redis，提供redis缓存和redis分布式锁的功能")]),e._v(" "),t("td",[t("RouterLink",{attrs:{to:"/zh/guide/redis.html"}},[e._v("利用redis提供分布式锁和分布式缓存")])],1)]),e._v(" "),t("tr",[t("td",[e._v("schedule")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/robfig/cron/v3")]),e._v("，提供定时任务的能力")]),e._v(" "),t("td",[t("a",{attrs:{href:"https://goner.fun/zh/guide/schedule.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("用cron表达式配置定时任务"),t("OutboundLink")],1)])]),e._v(" "),t("tr",[t("td",[e._v("urllib")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/imroc/req/v3")]),e._v("，提供http调用能力")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("grpc")]),e._v(" "),t("td",[e._v("提供开发grpc服务端和客户端的能力")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("cmux")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/soheilhy/cmux")]),e._v("，是统一端口可以提供混合服务的能力")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("zap")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("go.uber.org/zap")]),e._v("，实现"),t("code",[e._v("gone.Logger")]),e._v("日志接口，可以替换"),t("code",[e._v("logrus")]),e._v("实现更高效的日志输出")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("viper")]),e._v(" "),t("td",[e._v("封装"),t("code",[e._v("github.com/spf13/viper")]),e._v("，用于替换配置接口默认实现，可以支持丰富的配置文件格式")]),e._v(" "),t("td",[e._v("-")])])])]),e._v(" "),t("h2",{attrs:{id:"生态级-goners"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生态级-goners"}},[e._v("#")]),e._v(" 生态级 Goners")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/gone-io/emitter",target:"_blank",rel:"noopener noreferrer"}},[e._v("emitter"),t("OutboundLink")],1),e._v("，封装事件处理，可以用于 DDD 的 事件风暴")])])])}),[],!1,null,null,null);t.default=v.exports}}]);
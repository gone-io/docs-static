(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{316:function(t,e,s){"use strict";s.r(e);var n=s(10),a=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"core-concepts-of-gone"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#core-concepts-of-gone"}},[t._v("#")]),t._v(" Core Concepts of Gone")]),t._v(" "),e("p",[t._v("\"Our code, after all, is just lifeless matter, unless it's resurrected in "),e("strong",[t._v("Heaven")]),t._v("; for that, we need to "),e("strong",[t._v("bury")]),t._v(" it in a "),e("strong",[t._v("Cemetery")]),t._v('."')]),t._v(" "),e("h2",{attrs:{id:"goner"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#goner"}},[t._v("#")]),t._v(" Goner")]),t._v(" "),e("p",[t._v("In the Gone framework, the most fundamental and core concept is "),e("strong",[t._v("Goner")]),t._v(", which refers to a structure anonymously embedded with "),e("code",[t._v("gone.Flag")]),t._v(". For example:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Worker "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Goner serves as a component in the Gone framework and is crucial for implementing dependency injection:")]),t._v(" "),e("ol",[e("li",[t._v("A Goner can be injected as a property into other structures.")]),t._v(" "),e("li",[t._v("The properties of a Goner can be injected into other types.")])]),t._v(" "),e("p",[t._v("The reason for embedding a "),e("code",[t._v("gone.Flag")]),t._v(" is to limit the scope of dependency injection, ensuring that injection occurs only among Goners, thereby providing a unified pattern for component implementation in the Gone framework.")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("Below is the source code for Goner and gone.Flag:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Flag "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("g "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("Flag"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("goneFlag")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Goner represents the deceased.")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Goner "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("goneFlag")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("As an interface, Goner demands that objects implementing it have a private method "),e("code",[t._v("goneFlag()")]),t._v(". Due to Go's visibility restrictions, it's not possible to implement the internally defined private method "),e("code",[t._v("goneFlag()")]),t._v(" outside the "),e("code",[t._v("github.com/gone-io/gone")]),t._v(" package. Therefore, a structure can only become a Goner by embedding "),e("code",[t._v("gone.Flag")]),t._v(". This might be a bit complex, but essentially, it means that implementing Goner can only be achieved by embedding "),e("code",[t._v("gone.Flag")]),t._v(", not by directly implementing the "),e("code",[t._v("goneFlag()")]),t._v(" method.")])]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("When referring to multiple Goners, we use the plural form "),e("strong",[t._v("Goners")]),t._v(".")])]),t._v(" "),e("p",[t._v("The Gone framework also includes three special types of Goners:")]),t._v(" "),e("h3",{attrs:{id:"🔮-prophet"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#🔮-prophet"}},[t._v("#")]),t._v(" 🔮 Prophet")]),t._v(" "),e("p",[t._v("A special type of "),e("strong",[t._v("Goner")]),t._v(" that implements the "),e("strong",[e("code",[t._v("AfterRevive() AfterReviveError")])]),t._v(" method on regular "),e("strong",[t._v("Goners")]),t._v("; "),e("strong",[t._v("Prophet")]),t._v("'s "),e("strong",[t._v("AfterRevive")]),t._v(" is executed after a "),e("strong",[t._v("Goner")]),t._v(" is resurrected.")]),t._v(" "),e("p",[t._v("The Prophet interface is defined as follows:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Prophet represents the prophet.")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Prophet "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tGoner\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// AfterRevive is executed after the Goner is revived.")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("AfterRevive")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" AfterReviveError\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h3",{attrs:{id:"😇-angel"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#😇-angel"}},[t._v("#")]),t._v(" 😇 Angel")]),t._v(" "),e("p",[t._v("A special type of "),e("strong",[t._v("Goner")]),t._v(" possessing the angelic powers of "),e("strong",[e("code",[t._v("Start(Cemetery) error")])]),t._v(" on its left wing and "),e("strong",[e("code",[t._v("Stop(Cemetery) error")])]),t._v(" on its right wing, responsible for initiating (allocating resources, starting a service) and terminating (stopping a service, reclaiming resources) tasks, respectively.")]),t._v(" "),e("p",[t._v("The Angel interface is defined as follows:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Angel "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tGoner\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Start")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Stop")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h3",{attrs:{id:"🧛🏻‍♀️-vampire"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#🧛🏻‍♀️-vampire"}},[t._v("#")]),t._v(" 🧛🏻‍♀️ Vampire")]),t._v(" "),e("p",[t._v("A special type of "),e("strong",[t._v("Goner")]),t._v(" with a unique ability — sucking with "),e("strong",[e("code",[t._v("Suck(conf string, v reflect.Value) SuckError")])]),t._v(". "),e("strong",[t._v("Suck")]),t._v(" enables injecting values that are not Goners into Goners' properties.")]),t._v(" "),e("p",[t._v("The Vampire interface is defined as follows:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" SuckError "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Vampire "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tGoner\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Suck")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conf "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" v reflect"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Value"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" SuckError\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"cemetery"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cemetery"}},[t._v("#")]),t._v(" Cemetery")]),t._v(" "),e("p",[t._v("Cemetery is used to manage Goners, primarily providing methods for "),e("strong",[t._v("Burying")]),t._v(" and "),e("strong",[t._v("Reviving")]),t._v(" Goners. Its interface is defined as follows:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Cemetery "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ... Other methods")]),t._v("\n\tGoner\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bury")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Goner"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("GonerId"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" Cemetery  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Burying a Goner in the Cemetery")]),t._v("\n\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ReviveAllFromTombs revives all Goners.")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ReviveAllFromTombs")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("From the code, it's evident that Cemetery itself is a Goner, automatically buried and resurrected when the Gone framework starts.")]),t._v(" "),e("h3",{attrs:{id:"burying"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#burying"}},[t._v("#")]),t._v(" Burying")]),t._v(" "),e("p",[t._v("Burying a Goner in a Cemetery means registering the Goner with the framework for later property injection. In code implementation, "),e("strong",[t._v("Bury")]),t._v(" is a public method of "),e("strong",[t._v("Cemetery")]),t._v(", typically called through the "),e("strong",[t._v("Priest")]),t._v(" function.")]),t._v(" "),e("h3",{attrs:{id:"reviving"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reviving"}},[t._v("#")]),t._v(" Reviving")]),t._v(" "),e("p",[t._v("Reviving entails completing the injection of properties required by a Goner. In the "),e("code",[t._v("ReviveAllFromTombs() error")]),t._v(" function, all Goners buried in the Cemetery are attempted to be revived. If any property injection fails, the program panics.")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("After reviving all Goners, "),e("strong",[t._v("ReviveAllFromTombs")]),t._v(" calls the "),e("strong",[t._v("AfterRevive")]),t._v(" method of all "),e("strong",[t._v("Prophets")]),t._v(".")])]),t._v(" "),e("h2",{attrs:{id:"heaven"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#heaven"}},[t._v("#")]),t._v(" Heaven")]),t._v(" "),e("p",[t._v("Heaven represents a Gone program, responsible for managing the program's startup, shutdown, and associated processes (resurrection completed before startup). It facilitates executing certain hook tasks before and after startup and before program termination. Heaven accepts a priest function to begin its operation, as shown below:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" main\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/gone-io/gone"')]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Priest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Call cemetery.Bury to bury Goners")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Or call other Priest functions")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// TODO")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Run")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Priest"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Or:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" main\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/gone-io/gone"')]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Priest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Call cemetery.Bury to bury Goners")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Or call other Priest functions")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// TODO")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Prepare")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Priest"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("AfterStart")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//TODO: Perform operations after startup")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Run")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"priest"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#priest"}},[t._v("#")]),t._v(" Priest")]),t._v(" "),e("p",[t._v("Priest is a function responsible for burying Goners in the Cemetery. Its definition is as follows:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Priest "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v("\n")])])]),e("p",[t._v("In the implementation of the "),e("strong",[t._v("Priest")]),t._v(" function, you can call "),e("strong",[t._v("cemetery.Bury")]),t._v(" to accomplish this, as shown below:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Worker "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n\tName "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" Boss "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tgone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flag\n\tName "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("aPriest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tcemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bury")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("Boss"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Jim"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"boss-jim"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tcemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bury")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("Worker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Bob"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"worker-bob"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Anonymous burial, not specifying the GonerId of the buried Goner")]),t._v("\n\tcemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bury")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("Worker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("Name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"X"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n")])])]),e("p",[t._v("Alternatively, you can accomplish this by calling other "),e("strong",[t._v("Priest")]),t._v(" functions:")]),t._v(" "),e("div",{staticClass:"language-go extra-class"},[e("pre",{pre:!0,attrs:{class:"language-go"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("a1Priest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//todo")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("a2Priest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//todo")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("aPriest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery gone"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("a1Priest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("a2Priest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cemetery"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//todo")]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("If we develop a component package where multiple "),e("strong",[t._v("Goners")]),t._v(" are used to accomplish various functionalities, and we need to "),e("strong",[t._v("bury")]),t._v(" these "),e("strong",[t._v("Goners")]),t._v(" simultaneously when using them, we can write a "),e("strong",[t._v("Priest")]),t._v(" function to facilitate bulk "),e("strong",[t._v("burying")]),t._v(" of these "),e("strong",[t._v("Goners")]),t._v(" in business code.")]),t._v(" "),e("p",[t._v("That's exactly what we do with the built-in component package of the framework. Here's how it's done, along with the "),e("a",{attrs:{href:"https://github.com/gone-io/gone/blob/main/goner/priest.go",target:"_blank",rel:"noopener noreferrer"}},[t._v("code"),e("OutboundLink")],1),t._v(" and "),e("a",{attrs:{href:"https://goner.fun/goners/#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AEgoners",target:"_blank",rel:"noopener noreferrer"}},[t._v("documentation"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("p",[t._v("Additionally, we've developed a command-line utility called "),e("strong",[t._v("gone")]),t._v(", which scans for special comments "),e("code",[t._v("//go:gone")]),t._v(" to automatically generate "),e("strong",[t._v("Priest")]),t._v(" functions. You can refer to "),e("RouterLink",{attrs:{to:"/guide/auto-gen-priest.html"}},[t._v("Auto-generating Priest")]),t._v(" for more information.")],1)])}),[],!1,null,null,null);e.default=a.exports}}]);
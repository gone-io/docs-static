module.exports = {
    head: [
        ['link', { rel: 'icon', href: `/assets/img/logo.png` }],
        [
            'script',
            {
                type: 'text/javascript',
            },
            `
            if (location.hostname != 'localhost'){
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?ed9e5a48d8eeb5e6b55a0de9cb8f6486";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();

                if(location.pathname == '/my-github'){
                    location.href='https://github.com/gone-io/gone'
                }
            }
            `
        ],
    ],

    locales: {
        '/zh/': {
            lang: 'zh-CN',
            title: 'Gone 文档',
            description: 'Gone是一个轻量的，基于Golang的，依赖注入框架，集成了Gin、XOrm、Logrus等众多开源工具，用于提供便捷的Web开发。',
        },

        '/': {
            lang: 'en-US',
            title: 'Gone Document',
            description: 'Gone is a lightweight dependency injection framework based on Golang, integrating many open-source tools such as Gin, XOrm, Logrus, etc., to provide convenient web development.'
        },
    },

    themeConfig: {
        repo: 'gone-io/gone',
        docsDir: 'docs',
        docsRepo: 'gone-io/docs-static',

        editLinks: true,

        // 默认为 "Edit this page"
        editLinkText: '帮助我们改善此页面！',

        logo: '/assets/img/logo.png',

        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',

                nav: [
                    {
                        text: 'Introduction',
                        link: '/'
                    },
                    {
                        text: 'Quick Start',
                        link: '/quick-start/',
                        items: [{
                            text: 'Creating a Simple Web Project',
                            link: '/quick-start/simple.md',
                        }, {
                            text: 'Web + MySQL',
                            link: '/quick-start/mysql.md',
                        }]
                    },
                    {
                        text: 'Development Guide',
                        link: '/guide/',
                        items: [{
                            text: 'Core Concepts of Gone',
                            link: '/guide/core-concept.md',
                        }, {
                            text: 'Goner and Dependency Injection',
                            link: '/guide/gone-and-inject.md',
                        }, {
                            text: 'Injection Methods Supported by Gone',
                            link: '/guide/goner-inject.md',
                        }, {
                            text: 'How to Gracefully Use Built-in Goners?',
                            link: '/guide/inner-goner.md',
                        }, {
                            text: 'Configuring with Built-in Goners Support',
                            link: '/guide/config.md',
                        }, {
                            text: 'Performing database operations',
                            link: '/guide/xorm.md',
                        }, {
                            text: 'Gone\'s Hook Functions',
                            link: '/guide/hooks.md',
                        }, {
                            text: 'Logging Output',
                            link: '/guide/logrus.md',
                        }, {
                            text: 'Trace Log with traceId',
                            link: '/guide/tracer.md',
                        }, {
                            text: 'Auto-generate Priest',
                            link: '/guide/auto-gen-priest.md',
                        }, {
                            text: 'Using Redis for Distributed Locking and Caching',
                            link: '/guide/redis',
                        }, {
                            text: 'Unit Testing',
                            link: '/guide/unit-test.md',
                        }],
                    },
                    {
                        text: 'References',
                        link: '/references/'
                    },
                    {
                        text: "Goners",
                        link: '/goners/',
                    },
                ],

                sidebar: [
                    ['/', '介绍'],
                    '/quick-start/',
                    '/guide/',
                    '/guide/core-concept',
                ],
            },
            '/zh/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',

                nav: [
                    {
                        text: '介绍',
                        link: '/zh/'
                    },
                    {
                        text: '快速开始',
                        link: '/zh/quick-start/',
                        items: [{
                            text: '极简例子',
                            link: '/zh/quick-start/simple.md',
                        }, {
                            text: "使用",
                            items: [
                                {
                                    text: 'Web项目',
                                    link: '/zh/quick-start/web.md',
                                }, {
                                    text: 'Web + MySQL',
                                    link: '/zh/quick-start/mysql.md',
                                }
                            ],
                        }, {
                            text: "扩展",
                            items: [{
                                text: '封装一个Goner调用GPT',
                                link: '/zh/quick-start/gpt.md',
                            }]
                        }]
                    },
                    {
                        text: '开发指南',
                        link: '/zh/guide/',
                        items: [{
                            text: '核心概念',
                            link: '/zh/guide/core-concept.md',
                        }, {
                            text: "依赖注入",
                            items: [{
                                text: 'Goner和依赖注入',
                                link: '/zh/guide/inject-1-goner-and-inject.md',
                            }, {
                                text: '依赖注入方式',
                                link: '/zh/guide/inject-2-goner.md',
                            }, {
                                text: '函数参数的依赖注入',
                                link: '/zh/guide/inject-3-func.md',
                            }],
                        }, {
                            text: "内置模块使用",
                            items: [{
                                text: '内置Goners',
                                link: '/zh/guide/goner-a-use.md',
                            }, {
                                text: '配置读取',
                                link: '/zh/guide/goner-config.md',
                            }, {
                                text: '提供Web服务',
                                link: '/zh/guide/goner-gin.md',
                            }, {
                                text: '提供gRPC服务',
                                link: '/zh/guide/goner-grpc.md',
                            }, {
                                text: '日志输出',
                                link: '/zh/guide/goner-logger.md',
                            }, {
                                text: '使用Redis',
                                link: '/zh/guide/goner-redis.md',
                            }, {
                                text: '配置定时任务',
                                link: '/zh/guide/goner-schedule.md',
                            }, {
                                text: '链路追踪',
                                link: '/zh/guide/goner-tracer.md',
                            }, {
                                text: '使用数据库',
                                link: '/zh/guide/goner-xorm.md',
                            }],
                        }, {
                            text: "效率提升",
                            items: [{
                                text: '生成 Priest',
                                link: '/zh/guide/x-1-gen-priest.md',
                            }, {
                                text: '错误处理',
                                link: '/zh/guide/x-2-error.md',
                            }, {
                                text: '单元测试',
                                link: '/zh/guide/x-3-unit-test.md',
                            }, {
                                text: 'Hook 函数',
                                link: '/zh/guide/x-4-hooks.md',
                            }]
                        }],
                    },
                    {
                        text: '参考文档',
                        link: '/zh/references/'
                    },
                    {
                        text: "组件库",
                        link: '/zh/goners/',
                    },
                    {
                        text: "博客",
                        link: '/zh/blogs/',
                    },
                ],

                sidebar: [
                    '/zh/',
                    '/zh/quick-start/',
                    '/zh/guide/',
                    '/zh/guide/core-concept',
                ],
            },


        },
    },

    plugins: [
        'mermaidjs',
        [
            'redirect',
            {
                // 提供多语言重定向功能
                // 它会自动从 `/foo/bar/` 定向到 `/:locale/foo/bar/`，如果对应的页面存在
                locales: true,
            },
        ],
    ],
};
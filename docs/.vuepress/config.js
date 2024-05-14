module.exports = {
    head: [
        ['link', { rel: 'icon', href: `/assets/img/logo.png` }],
        [
            'script',
            {
                type: 'text/javascript',
            },
            `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ed9e5a48d8eeb5e6b55a0de9cb8f6486";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

if(location.pathname == '/'){
    location.pathname='/zh/'
}
`
        ],
    ],

    locales: {
        '/zh/': {
            lang: 'zh-CN',
            title: 'Gone 文档',
            description: '做一个对Spring程序员最友好的Golang框架',
        },

        // '/': {
        //     lang: 'en-US',
        //     title: 'Gone Document',
        //     description: 'Build the Golang framework which is most friendly to Spring programmers'
        // },
    },

    themeConfig: {
        repo: 'gone-io/gone',
        docsDir: 'docs',

        logo: '/assets/img/logo.png',

        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',


                // nav: [
                //     {
                //         text: 'Guide',
                //         link: '/guide/'
                //     },
                //     {
                //         text: 'Quick Start',
                //         link: '/quick-start/'
                //     },
                //     {
                //         text: 'API Reference',
                //         link: '/api/'
                //     },
                //     {
                //         text: 'Gone Story',
                //         link: '/story/'
                //     },
                // ],

                // sidebar: [
                //     ['/en/', 'Introduction'],
                //     '/en/quick-start/',
                //     '/en/guide/',
                // ],
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
                            text: '一个简单的web项目',
                            link: '/zh/quick-start/simple.md',
                        }, {
                            text: 'Web+MySQL',
                            link: '/zh/quick-start/mysql.md',
                        }]
                    },
                    {
                        text: '开发指南',
                        link: '/zh/guide/',
                        items: [{
                            text: '核心概念',
                            link: '/zh/guide/core-concept.md',
                        }, {
                            text: 'Goner和依赖注入',
                            link: '/zh/guide/gone-and-inject.md',
                        }, {
                            text: '支持哪些方式注入？',
                            link: '/zh/guide/goner-inject.md',
                        }, {
                            text: '优雅使用内置Goners',
                            link: '/zh/guide/inner-goner.md',
                        }, {
                            text: '支持配置文件',
                            link: '/zh/guide/config.md',
                        }, {
                            text: '操作数据库',
                            link: '/zh/guide/xorm.md',
                        }, {
                            text: 'Hook函数',
                            link: '/zh/guide/hooks.md',
                        }, {
                            text: '日志输出',
                            link: '/zh/guide/logrus.md',
                        }, {
                            text: '使用traceId追踪日志',
                            link: '/zh/guide/tracer.md',
                        }, {
                            text: '自动生成Priest',
                            link: '/zh/guide/auto-gen-priest.md',
                        }],
                    },
                    {
                        text: 'References',
                        link: '/zh/references/'
                    },
                    {
                        text: "Goners",
                        link: '/zh/goners/',
                    },

                    //     {
                    //         text: '故事',
                    //         link: '/zh/story/'
                    //     }, {
                    //         text: 'Goner 组件库',
                    //         link: '/zh/goners/'
                    //     },
                ],

                sidebar: [
                    ['/zh/', '介绍'],
                    '/zh/quick-start/',
                    '/zh/guide/',
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
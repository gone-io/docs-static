module.exports = {
    head: [
        ['link', { rel: 'icon', href: `/assets/img/logo.png` }],
    ],

    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Gone 文档',
            description: '做一个对Spring程序员最友好的Golang框架',
        },

        '/en/': {
            lang: 'en-US',
            title: 'Gone Document',
            description: 'Build the Golang framework which is most friendly to Spring programmers'
        },
    },

    themeConfig: {
        repo: 'gone-io/gone',
        docsDir: 'docs',

        logo: '/assets/img/logo.png',

        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',

                nav: [
                    {
                        text: '指南',
                        link: '/guide/'
                    },

                    {
                        text: '快速开始',
                        link: '/quick-start/'
                    },
                    {
                        text: 'API 参考',
                        link: '/api/'
                    },
                    {
                        text: '故事',
                        link: '/story/'
                    },
                ],

                sidebar: [
                    ['/', '介绍'],
                    '/guide/',
                ],
            },

            '/en/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',

                nav: [
                    {
                        text: 'Guide',
                        link: '/en/guide/'
                    },
                    {
                        text: 'Quick Start',
                        link: '/en/quick-start/'
                    },
                    {
                        text: 'API Reference',
                        link: '/en/api/'
                    },
                    {
                        text: 'Gone Story',
                        link: '/en/story/'
                    },
                ],

                sidebar: [
                    ['/en/', 'Introduction'],
                    '/en/guide/',
                ],
            },
        },
    }
};
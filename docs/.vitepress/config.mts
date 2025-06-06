import { defineConfig } from 'vitepress'

// https://vitepress.dev/zh/reference/site-config
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    title: "MoYingJi QwQ",
    description: "一个不知道是什么的网站",

    srcDir: './src',

    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        nav: [
            { text: '关于', link: '/about' },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/MoYingJi/moyingji.github.io' }
        ],
        sidebar: [
        ],

        search: {
            provider: 'local',
            options: {}
        },
    },

    lang: 'zh-CN',
    locales: {
        root: {
            label: '中文',
            lang: 'zh-CN'
        },
    },

    markdown: {
        // Markdown 配置选项
        // https://vitepress.dev/guide/markdown
        // https://vitepress.dev/zh/reference/site-config#markdown

        image: {
            lazyLoading: true
        },
        math: true,
    },

    vite: {
        // Vite 配置选项
        // https://cn.vitejs.dev/config

        publicDir: '../public',

        plugins: [
        ]
    },
})

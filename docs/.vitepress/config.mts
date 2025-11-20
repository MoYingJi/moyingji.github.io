import { DefaultTheme, defineConfig, UserConfig } from "vitepress"

import * as MdExt from "./extensions/markdown/_script.ts"
import { vitepressDemoPlugin } from "vitepress-demo-plugin"
import mathjax3 from "markdown-it-mathjax3"
import mdIns from "markdown-it-ins"
import mdFootnote from "markdown-it-footnote"

// https://vitepress.dev/zh/reference/site-config
const config: UserConfig<NoInfer<DefaultTheme.Config>> = {
    title: "MoYingJi QwQ",
    description: "一个不知道是什么的网站",

    srcDir: "./src",
    cleanUrls: true,

    rewrites: {
        // List
        ":path/list/:name": ":path/:name",
    },

    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        nav: [
            { text: "关于", link: "/about" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MoYingJi/moyingji.github.io" }
        ],
        sidebar: {
        },

        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                    },
                    modal: {
                        displayDetails: "显示详细信息",
                        resetButtonTitle: "清除查询条件",
                        backButtonTitle: "返回",
                        noResultsText: "没有搜索结果",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                            closeText: "关闭",
                        },
                    }
                },
            }
        },
        editLink: {
            pattern: "https://github.com/MoYingJi/moyingji.github.io/blob/main/docs/src/:path?plain=1",
            text: "于 GitHub 查看此页"
        },
        outline: "deep",


        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
        darkModeSwitchLabel: "外观",
        returnToTopLabel: "返回顶部",
        sidebarMenuLabel: "菜单",
        outlineTitle: "页面导航",
    },

    lang: "zh-CN",
    locales: {
        root: {
            label: "中文",
            lang: "zh-CN"
        },
    },

    markdown: {
        // Markdown 配置选项
        // https://vitepress.dev/guide/markdown
        // https://vitepress.dev/zh/reference/site-config#markdown

        image: {
            lazyLoading: true
        },

        config(md) {
            md.use(mathjax3)
            md.use(vitepressDemoPlugin)
            md.use(mdIns)
            md.use(mdFootnote)

            MdExt.config(md)
            md.set({
                breaks: true,
            })
        },

        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息"
        }
    },

    vite: {
        // Vite 配置选项
        // https://cn.vitejs.dev/config

        publicDir: "../public",

        plugins: [
        ],

        optimizeDeps: {
            exclude: [
                "@nolebase/vitepress-plugin-enhanced-readabilities/client",
                "vitepress",
                "@nolebase/ui",
            ]
        },
        ssr: {
            noExternal: [
                "@nolebase/ui-asciinema",
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-highlight-targeted-heading",
                "@nolebase/ui",

                "naive-ui", "date-fns", "vueuc"
            ]
        }
    },

    vue: {
        // Vue 配置选项
        template: {
            compilerOptions: {
                isCustomElement: (tag) => {
                    if (tag.startsWith("mjx-")) return true
                }
            }
        }
    },
}



// noinspection JSUnusedGlobalSymbols
export default defineConfig(config)

<script setup lang="ts">
import DefaultTheme from "vitepress/theme-without-fonts"

import { h, ref, onMounted, onUnmounted } from "vue"
import { useData } from "vitepress"

import { darkTheme, lightTheme } from "naive-ui"
import type { GlobalTheme } from "naive-ui"

import { NConfigProvider } from "naive-ui"

import * as ER from "@nolebase/vitepress-plugin-enhanced-readabilities/client"

import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client"
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

const data = useData()

const Layout = h(DefaultTheme.Layout, null, {
    // 为较宽的屏幕的导航栏添加阅读增强菜单
    "nav-bar-content-after": () => h(ER.NolebaseEnhancedReadabilitiesMenu),
    // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
    "nav-screen-content-after": () => h(ER.NolebaseEnhancedReadabilitiesScreenMenu),
    // 闪烁高亮当前的目标标题
    'layout-top': () => [ h(NolebaseHighlightTargetedHeading), ],
})

// 响应式主题变量
const theme = ref<GlobalTheme | null>(null)

// 检查 HTML 元素是否包含 dark 类 并设置 theme
function checkDarkMode() {
    theme.value = document.documentElement.classList.contains("dark")
        ? darkTheme : lightTheme
}

// 创建 MutationObserver 监听类名变化
let observer: MutationObserver | null = null

onMounted(() => {
    // 初始检查
    checkDarkMode()

    // 配置监听 html 的 class 变化
    observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === "class")
                checkDarkMode()
        })
    })
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
    })
})

onUnmounted(() => {
    // 组件卸载时断开监听
    observer?.disconnect()
})

</script>



<template>
    <n-config-provider :theme="theme">
        <Layout>
        </Layout>
    </n-config-provider>
</template>

<style lang="sass">
    // 滚动跳转动画
    html
        scroll-behavior: smooth
    html.disable-scroll-transition
        scroll-behavior: auto
</style>

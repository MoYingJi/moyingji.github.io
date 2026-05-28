<script setup lang="ts">
import DefaultTheme from "vitepress/theme-without-fonts"

import { h } from "vue"

import * as ER from "@nolebase/vitepress-plugin-enhanced-readabilities/client"

import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client"
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

const Layout = h(DefaultTheme.Layout, null, {
    // 为较宽的屏幕的导航栏添加阅读增强菜单
    "nav-bar-content-after": () => h(ER.NolebaseEnhancedReadabilitiesMenu),
    // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
    "nav-screen-content-after": () => h(ER.NolebaseEnhancedReadabilitiesScreenMenu),
    // 闪烁高亮当前的目标标题
    'layout-top': () => [ h(NolebaseHighlightTargetedHeading), ],
})
</script>

<template>
    <Layout>
    </Layout>
</template>

<style lang="sass">
    // 滚动跳转动画
    html
        scroll-behavior: smooth
    html.disable-scroll-transition
        scroll-behavior: auto
</style>

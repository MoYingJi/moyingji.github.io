<script setup lang="ts">
    import { VPBadge } from "vitepress/theme";

    const {
        text,
        tColor = "var(--vp-c-text-1)",
        bColor = "var(--vp-badge-info-bg)",
    } = defineProps<{
        text : string,
        tColor ?: string,
        bColor ?: string,
    }>()
</script>

<template>
    <VPBadge class="BadgeText" :style="{ color: tColor, backgroundColor: bColor }" :text="text" />
</template>

<style lang="sass">
    .BadgeText
        font-size: 15px
        display: inline
        border-radius: 5px
        padding: 0 5px
        font-weight: normal
</style>


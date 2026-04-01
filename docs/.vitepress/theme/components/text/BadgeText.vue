<script setup lang="ts">
    import { VPBadge } from "vitepress/theme";

    const {
        text,
        tColor = "var(--vp-c-text-1)",
        bColor = "var(--vp-badge-info-bg)",
        rColor = "var(--waline-info-color)",
    } = defineProps<{
        text : string,
        tColor ?: string,
        bColor ?: string,
        rColor ?: string,
    }>()
</script>

<template>
    <VPBadge
        class="BadgeText"
        :style="{ color: tColor, backgroundColor: bColor, borderColor: rColor }"
        :text="text"
    > <slot/> </VPBadge>
</template>

<style lang="sass">
    .BadgeText
        font-size: 0.93em
        display: inline
        border-radius: 0.3em
        padding: 0 0.3em
        font-weight: normal
</style>

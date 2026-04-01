<script setup lang="ts">
    import { VPBadge } from "vitepress/theme";

    const {
        text,
        tColor = "var(--vp-badge-info-text)",
        bColor = "var(--vp-badge-info-bg)",
    } = defineProps<{
        text : string,
        tColor ?: string,
        bColor ?: string,
    }>()
</script>

<template>
    <VPBadge
        :style="{ color: tColor, backgroundColor: bColor }"
        :text="text"
    > <slot/> </VPBadge>
</template>

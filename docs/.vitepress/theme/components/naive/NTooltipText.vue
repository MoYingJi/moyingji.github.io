<script setup lang="ts">
    import { NTooltip } from "naive-ui"

    const {
        text,
        maxWidth,
    } = defineProps<{
        text : string,
        maxWidth ?: string,
    }>()
</script>

<template>
    <ClientOnly>
        <n-tooltip
            trigger="click"
            :style="{
                maxWidth: maxWidth
            }"
            :theme-overrides="{
                color: 'rgb(72, 72, 78)' // popoverColor
            }"
        >
            <template #trigger>
                <u class="tooltip-trigger mark-hl"> {{ text }} </u>
            </template>

            <div class="tooltip-content"><slot/></div>
        </n-tooltip>
    </ClientOnly>
</template>

<style lang="sass">
</style>

<script setup lang="ts">
    import { NTooltip } from "naive-ui"

    const {
        text
    } = defineProps<{
        text : string
    }>()
</script>

<template>
    <ClientOnly>
        <n-tooltip class="n-tooltip" trigger="hover" :theme-overrides="{
            color: 'rgb(72, 72, 78)' // popoverColor
        }">
            <template #trigger>
                <u class="mark-hl"> {{ text }} </u>
            </template>

            <div class="tooltip-content"><slot/></div>
        </n-tooltip>
    </ClientOnly>
</template>

<style lang="sass">
</style>

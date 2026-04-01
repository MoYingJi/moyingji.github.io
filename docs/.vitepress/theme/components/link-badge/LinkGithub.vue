<script setup lang="ts">
    import { Pill } from "@theojs/lumen"

    const {
        project,
        display,
        image,
    } = defineProps<{
        project  : string,
        display ?: string,
        image   ?: boolean | string | { light: string, dark: string },
    }>()

    const githubIcon = {
        light: "https://i.theojs.cn/logo/github.svg",
        dark: "https://i.theojs.cn/logo/github-dark.svg"
    }

    const imageDisplay = image === undefined
        ? githubIcon
        : typeof image === "boolean"
            ? githubIcon
            : image
</script>

<template>
    <Pill
        :name="'GitHub: ' + (display || project)"
        :link="'https://github.com/' + project"
        :image="imageDisplay"
        rel="noopener noreferrer"
    />
</template>

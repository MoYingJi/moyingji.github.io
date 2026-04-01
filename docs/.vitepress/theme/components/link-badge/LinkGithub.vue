<script setup lang="ts">
    import { DocPill } from "@theojs/lumen"

    const {
        project,
        display,
        image,
    } = defineProps<{
        project  : string,
        display ?: string,
        image   ?: boolean | string | { light: string, dark: string },
    }>()

    const _s = display || project

    const githubIcon = {
        light: "https://i.theojs.cn/logo/github.svg",
        dark: "https://i.theojs.cn/logo/github-dark.svg"
    }

    const _image = typeof image === "boolean"
        ? ( image ? githubIcon : undefined )
        : image
</script>

<template>
    <DocPill
        :name="'GitHub: ' + _s"
        :link="'https://github.com/' + project"
        :image="_image"
        rel="noopener noreferrer"
    />
</template>

<script setup lang="ts">
    import ProjectDownload from "./ProjectDownload.vue";

    const {
        name
    } = defineProps<{
        name : string
    }>()
</script>

<template>
    <ProjectDownload>
        <span class="project-archlinuxcn">archlinuxcn</span>
        <span>/</span>
        <span class="project-package-name">{{ name }}</span>
        <span> </span>
        <img class="unselectable" draggable="false" :src="'https://img.shields.io/badge/dynamic/json?label=archlinuxcn&query=%24.version&url=https%3A%2F%2Fbuild.archlinuxcn.org%2Fapi%2Fv2%2Fpackages%2F' + name"/>
    </ProjectDownload>
</template>

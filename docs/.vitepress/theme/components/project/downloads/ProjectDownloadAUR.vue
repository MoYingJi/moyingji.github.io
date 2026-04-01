<script setup lang="ts">
    import ProjectDownload from "./ProjectDownload.vue";

    const {
        name,
        img = false,
    } = defineProps<{
        name  : string,
        img  ?: boolean,
    }>()
</script>

<template>
    <ProjectDownload>
        <span class="project-aur">aur</span>
        <span>/</span>
        <span class="project-package-name">{{ name }}</span>
        <span v-if="img"> </span>
        <img v-if="img" class="unselectable" draggable="false" :src="`https://img.shields.io/aur/version/${name}`"/>
    </ProjectDownload>
</template>

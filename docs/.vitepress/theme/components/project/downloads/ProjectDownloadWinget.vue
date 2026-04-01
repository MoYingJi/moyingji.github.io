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
        <span><code>{{ name }}</code></span>
        <span v-if="img"> </span>
        <img v-if="img" class="unselectable" draggable="false" :src="`https://img.shields.io/winget/v/${name}`"/>
    </ProjectDownload>
</template>

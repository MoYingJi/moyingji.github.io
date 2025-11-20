<script setup lang="ts">
    const {
        rb,
        rt,
    } = defineProps<{
        rb: string,
        rt: string,
    }>()
</script>

<template>
    <ruby>{{ rb }}<rp>(</rp><rt>{{ rt }}</rt><rp>)</rp></ruby>
</template>

<style scoped lang="sass">

</style>

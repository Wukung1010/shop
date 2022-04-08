<script setup lang="ts">
defineProps<{
  sizes: number[];
}>()
</script>

<template>
  <colgroup>
    <col v-for="size in sizes" :width="size">
  </colgroup>
</template>

<style></style>
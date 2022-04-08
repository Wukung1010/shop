<script setup lang="ts">
import ColGroup from './ColGroup.vue'

defineProps<{
  columns: string[];
  sizes: number[];
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <table class="rounded-md w-full table-fixed overflow-hidden">
      <thead class="text-xl h-10 bg-gray-200 whitespace-nowrap">
        <th v-for="title in columns">{{title}}</th>
      </thead>
      <ColGroup :sizes="sizes"></ColGroup>
    </table>
    <div class="overflow-auto">
      <table class="w-full table-fixed">
        <ColGroup :sizes="sizes"></ColGroup>
        <tbody>
          <slot></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
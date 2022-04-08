<script setup lang="ts">
defineProps<{
  title: string;
  show: boolean;
}>()

defineEmits<{
  (event: 'ok'): void;
  (event: 'update:show', arg: boolean): void;
}>()
</script>

<template>
  <div v-show="show" class="r-box bg-white space-y-3 shrink-0">
    <div>
      <span class="text-gray-400">{{title}}</span>
    </div>
    <div class="border-b border-t py-3 flex space-x-3">
      <slot></slot>
    </div>
    <div class="text-right">
      <button class="px-10 cannel-btn" @click="$emit('update:show', false)">取消</button>
      <button class="px-10 ml-1 ok-btn" @click="$emit('ok')">添加</button>
    </div>
  </div>
</template>

<style></style>
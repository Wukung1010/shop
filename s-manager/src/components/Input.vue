<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  warn: boolean;
  warnInfo: string;
  value: string;
  type: string;
  placeholder: string;
}>()

const emits = defineEmits<{
  (event: 'update:value', newVal: string): void;
}>()

const input = ref()

const style = computed(() => props.warn ? { 'border-rose-500': true } : { 'border-gray-300': true })
</script>

<template>
  <div class="flex flex-col">
    <input 
      :class="style"
      :ref="input"
      :value="props.value"
      :type="type"
      :placeholder="placeholder"
      @input="emits('update:value', ($event.target as any).value)">
    <span 
      :class="{ 'text-rose-500': true, 'text-lg': true, 'py-0': true, 'opacity-0': !props.warn }"
      >{{props.warnInfo}}</span>
  </div>
</template>

<style></style>
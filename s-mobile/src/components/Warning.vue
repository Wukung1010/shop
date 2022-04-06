<script setup lang="ts">
defineProps<{ msg: string[] }>()

defineEmits<{
  (event: 'ok'): void
  (event: 'cannel'): void
}>()
</script>

<template>
  <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center">
    <div class="absolute w-full h-full bg-gray-400/50" @click="$emit('cannel')"></div>
    <div class="absolute bg-white p-3">
      <div class="p-1 w-48 space-y-3">
        <div>警告</div>
        <div class="flex flex-col border-b border-t py-1">
          <span v-for="item,index in msg">{{`${index + 1}. ${item}`}}</span>
        </div>
        <div class="text-center">
          <button class="w-full bg-rose-500 py-2" @click="$emit('ok')">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
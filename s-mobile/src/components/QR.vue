<script setup lang="ts">
defineEmits<{
  (event: 'cannel'): void
}>()

const QR = '/api/mobile/QR.jpeg'
</script>

<template>
  <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center">
    <div class="absolute w-full h-full bg-gray-400/50" @click="$emit('cannel')"></div>
    <div class="absolute bg-white p-3">
      <div class="p-1 w-48 space-y-3">
        <img :src="QR" alt="">
      </div>
    </div>
  </div>
</template>

<style></style>
<script setup lang="ts">
defineProps<{
  price: number
}>()

defineEmits<{
  (event: 'cannel'): void
}>()

const QR = '/api/qr/business'
</script>

<template>
  <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center">
    <div class="absolute w-full h-full bg-gray-400/50" @click="$emit('cannel')"></div>
    <div class="absolute bg-white p-3">
      <div class="w-60 space-y-3 flex flex-col">
        <span class="text-center">长按识别二维码付款</span>
        <span class="text-rose-400">金额 ¥{{price}}</span>
        <img :src="QR" alt="">
      </div>
    </div>
  </div>
</template>

<style></style>

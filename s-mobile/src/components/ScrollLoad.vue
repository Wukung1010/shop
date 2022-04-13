<script setup lang="ts">
import { ref } from 'vue'

const child = ref()
const style = ref<string>('margin-top: -40px')
const emit = defineEmits<{
  (event: 'load'): void
}>()

const maxDiff = 200
let start = 0
let move = 0
let touching = false
function handleTouchStart (event: TouchEvent) {
  if (child.value?.getBoundingClientRect().top <= 0) {
    start = event.touches[0].pageY
    touching = true
  }
}
function handleTouchEnd () {
  if (move >= maxDiff) {
    emit('load')
  }
  start = 0
  touching = false
  style.value = 'margin-top: -40px'
}
function handleTouchMove (event: TouchEvent) {
  if (touching) {
    move = event.touches[0].pageY - start
    if (move > 0) {
      event.preventDefault()
      const mt = Math.min(0, (-200 + move) / 5)
      style.value = `margin-top: ${mt}px`
    }
  }
}
</script>

<template>
  <div class="w-full h-full" ref="child" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div :style="style">
      <span class="block h-[40px] text-center text-gray-400">下拉加载</span>
      <slot></slot>
    </div>
  </div>
</template>

<style></style>
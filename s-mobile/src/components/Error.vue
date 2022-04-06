<script setup lang="ts">
import { ref } from 'vue'
import api from '../api'

api.errorHandler((err: Error) => {
  if (!show.value) {
    show.value = true
    setTimeout(() => show.value = false, 3000)
  }
})

const show = ref(false)
const msg = ref('服务器异常')
</script>

<template>
  <Transition>
    <div class="absolute bottom-24 w-full text-center pointer-events-none" v-if="show">
      <span class="rounded-lg bg-gray-500/40 px-3 py-1">{{msg}}</span>
    </div>
  </Transition>
</template>

<style></style>
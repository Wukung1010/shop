<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
  <span class="text-rose-500">总价: ¥{{store.state.order.total}}</span>
</template>

<style></style>
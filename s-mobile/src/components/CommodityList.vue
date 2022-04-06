<script setup lang="ts">
import { useStore } from 'vuex'
import type { Store } from '../store'
import type { Commodity } from '../../../types'

const store = useStore<Store>()

const emit = defineEmits<{
  (event: 'ok', item: Commodity): void;
  (event: 'cannel'): void;
}>()

function addCommodity (item: Commodity) {
  emit('ok', item)
}

function cannel () {
  emit('cannel')
}
</script>

<template>
  <div class="h-full w-full absolute top-0 left-0">
    <div class="absolute w-full h-full bg-gray-400/50" @click="cannel"></div>
    <div class="absolute w-full h-5/6 overflow-hidden bottom-0 bg-white flex flex-col px-3">
      <div class="flex">
        <span class="text-lg py-1 border-b flex-auto">商品列表</span>
        <span class="text-lg py-1 border-b w-10 text-right" @click="cannel">X</span>
      </div>
      <div class="flex flex-col overflow-auto">
        <div v-for="item in store.state.commodity.list" :key="item.id" class="border-b py-2 flex items-center" @click="addCommodity(item)">
          <div class="flex-auto flex flex-col">
            <span>{{item.title}}</span>
            <span class="text-sm text-gray-500">库存: {{item.count}}</span>
          </div>
          <span>¥{{item.price}}/{{item.priceUnit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
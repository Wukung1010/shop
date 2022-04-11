<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Order, OrderState } from '../../../types'
import api from '../api'

const store = useStore()

const showOrderIndex = ref(-1)

let list = ref<Order[]>([])

function show (index: number) {
  if (showOrderIndex.value === index) {
    showOrderIndex.value = -1
  } else {
    showOrderIndex.value = index
  }
}

const loadding = ref(false)
function search () {
  loadding.value = true
  api
    .searchCannelOrder(store.state.user.phone)
    .then((data) => list.value = data)
    .finally(() => loadding.value = false)
}

onMounted(() => {
  search()
})
</script>

<template>
  <div class="h-full bg-white overflow-auto flex flex-col">
    <div v-show="list.length === 0" class="p-3 text-center text-zinc-400">{{loadding ? '加载中...' : '空空如也~'}}</div>
    <div v-show="list.length > 0" class="flex-auto">
      <div v-for="item, index in list" :key="index" class="py-1 px-3 border-b" @click="show(index)">
        <div class="flex">
          <span class="text-gray-500 text-sm block flex-auto">订单号:{{item.code}}</span>
          <span class="text-gray-500 text-sm">{{new Date(item.createdAt!).toLocaleString()}}</span>
        </div>
        <div class="flex text-ellipsis whitespace-nowrap">
          <span class="flex-auto">{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div v-show="index === showOrderIndex" class="flex flex-col">
          <span class="text-sm text-gray-500">地址</span>
          <span>{{item.address}}</span>
          <span class="text-sm text-gray-500">备注</span>
          <span>{{item.remarks}}</span>
        </div>
        <div class="text-right">
          <span class="text-rose-400">总价: ¥{{item.total}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
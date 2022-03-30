<script setup lang="ts">
import { defineProps, onMounted, onUpdated, reactive, ref } from 'vue'
import { OrderInfo } from '../types'
import api from '../api'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps<{ type: 'order'|'changeOrder' }>()

const store = useStore()

const showOrderIndex = ref(-1)

let list = ref<OrderInfo[]>([])

function search () {
  if (props.type === 'order') {
    api.searchOrder(store.state.phone).then((data) => {
      list.value = data
    })
  } else {
    api.searchChangeOrder(store.state.phone).then((data) => {
      list.value = data
    })
  }
}

function show (index: number) {
  if (showOrderIndex.value === index) {
    showOrderIndex.value = -1
  } else {
    showOrderIndex.value = index
  }
}

function formatDate (time: number) {
  const date = new Date(time)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

onMounted(() => {
  search()
})

onBeforeRouteUpdate(() => {
  search()
})
</script>

<template>
  <div class="h-full bg-white overflow-hidden flex flex-col">
    <div v-show="list.length === 0" class="p-3 text-center text-zinc-400">空空如也~</div>
    <div v-show="list.length > 0" class="flex-auto">
      <div v-for="item, index in list" :key="index" class="px-3 border-b" @click="show(index)">
        <div class="flex">
          <span class="text-gray-500 text-sm block flex-auto">订单编号:{{item.id}}</span>
          <span class="text-gray-500 text-sm">{{formatDate(item.created)}}</span>
        </div>
        <div class="flex">
          <div class="flex flex-col flex-auto text-ellipsis whitespace-nowrap">
            <span>{{item.userInfo.name}} {{item.userInfo.phone}}</span>
          </div>
          <div class="flex items-end">
            <span>总金额:</span>
            <span class="inline-block w-20 text-right">¥{{item.totalPrice}}</span>
          </div>
        </div>
        <div v-show="index === showOrderIndex" class="flex flex-col">
          <span class="text-sm text-gray-500">地址</span>
          <span>{{item.userInfo.adress}}</span>
          <span class="text-sm text-gray-500">备注</span>
          <span>{{item.userInfo.remarks}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
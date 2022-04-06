<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Table from '../components/OrderTable.vue'
import api from '../api'
import { Order, OrderState } from '../../../types'

const allOrders = ref<Order[]>([])

const state = ref(OrderState.PRE_PAY)
const isPrePay = computed(() => state.value === OrderState.PRE_PAY)
const isDone = computed(() => state.value === OrderState.DONE)
const isCannel = computed(() => state.value === OrderState.CANNEL)
const isDel = computed(() => state.value === OrderState.DEL)
const changeTagPrePay = () => state.value = OrderState.PRE_PAY
const changeTagDone = () => state.value = OrderState.DONE
const changeTagCannel = () => state.value = OrderState.CANNEL
const changeTagDel = () => state.value = OrderState.DEL

const showOrders = computed(() => allOrders.value.filter((item) => state.value === item.state))

const loadding = ref(false)
function loadCommodity () {
  loadding.value = true
  api
    .getAllOrders()
    .then((data) => (allOrders.value = data, loadding.value = false))
}

function update (item: Order) {
  item.state = OrderState.DONE
  api
    .updateOrder(item)
    .then((data) => {
      allOrders.value = allOrders.value
    })
}

function remove (item: Order, index: number) {
  if (state.value === OrderState.DEL) {
    api
      .removeOrder(`${item.id}`)
      .then(() => {
        allOrders.value.splice(index, 1)
        allOrders.value = allOrders.value
      })
  } else {
    item.state = OrderState.DEL
    api
      .updateOrder(item)
      .then((data) => {
        allOrders.value = allOrders.value
      })
  }
    
}

onMounted(() => loadCommodity())
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box bg-white flex shrink-0">
      <div class="flex-auto">
        <button class="w-24 h-full" :class="{ 'bg-teal-400': isPrePay, 'hover:bg-teal-500': isPrePay }" @click="changeTagPrePay">待支付</button>
        <button class="w-24 h-full" :class="{ 'bg-teal-400': isDone, 'hover:bg-teal-500': isDone }" @click="changeTagDone">已完成</button>
        <button class="w-24 h-full" :class="{ 'bg-teal-400': isCannel, 'hover:bg-teal-500': isCannel }" @click="changeTagCannel">已撤销</button>
        <button class="w-24 h-full" :class="{ 'bg-teal-400': isDel, 'hover:bg-teal-500': isDel }" @click="changeTagDel">已删除</button>
      </div>
      <div>
        <input class="border-gray-400" type="text">
        <button>搜索</button>
      </div>
    </div>
    <div class="r-box bg-white flex-auto">
      <Table :state="state" :list="showOrders" @update="update" @remove="remove"></Table>
    </div>
  </div>
</template>

<style></style>
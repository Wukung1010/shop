<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Table from '../components/Table.vue'
import OrderInfo from '../components/OrderInfo.vue'
import api from '../api'
import { Distributor, Order, OrderState } from '../types'

const allDistributors = ref<Distributor[]>([])
const allOrders = ref<Order[]>([])
const columns = [ '序号', '订单号', '姓名', '电话', '地址', '客户留言', '总价', '创建时间', '分销人', '操作' ]
const sizes = [ 60, 100, 100, 80, 100, 100, 100, 100, 100, 120 ]

const state = ref(OrderState.PRE_PAY)
const isPrePay = computed(() => state.value === OrderState.PRE_PAY)
const isPreSend = computed(() => state.value === OrderState.PRE_SEND)
const isSended = computed(() => state.value === OrderState.SENDED)
const isPreCannel = computed(() => state.value === OrderState.PRE_CANNEL)
const isDone = computed(() => state.value === OrderState.DONE)
const isCannel = computed(() => state.value === OrderState.CANNEL)
const isDel = computed(() => state.value === OrderState.DEL)
const changeTagPrePay = () => state.value = OrderState.PRE_PAY
const changeTagDone = () => state.value = OrderState.DONE
const changeTagCannel = () => state.value = OrderState.CANNEL
const changeTagDel = () => state.value = OrderState.DEL
const changeTagPreSend = () => state.value = OrderState.PRE_SEND
const changeTagSended = () => state.value = OrderState.SENDED
const changeTagPreCannel = () => state.value = OrderState.PRE_CANNEL

const optTitle = computed(() => {
  if (state.value === OrderState.PRE_PAY) {
    return '支付完成'
  } else if (state.value === OrderState.PRE_SEND) {
    return '已发货'
  } else if (state.value === OrderState.SENDED) {
    return '完成'
  } else if (state.value === OrderState.CANNEL) {
    return '完成'
  } else if (state.value === OrderState.PRE_CANNEL) {
    return '待退单'
  }
})

const showOrders = computed(() => allOrders.value.filter((item) => state.value === item.state))

const loadding = ref(false)
function loadOrders () {
  loadding.value = true
  Promise
    .all([api.getAllOrders(), api.getAllDistributors()])
    .then(([orders, distributors]) => {
      allOrders.value = orders
      allDistributors.value = distributors
      loadding.value = false
    })
}

function update (item: Order) {
  if (item.state === OrderState.PRE_PAY) {
    item.state = OrderState.PRE_SEND
  } else if (item.state === OrderState.PRE_SEND) {
    item.state = OrderState.SENDED
  } else if (item.state === OrderState.SENDED) {
    item.state = OrderState.DONE
  } else if (item.state === OrderState.PRE_CANNEL) {
    item.state = OrderState.CANNEL
  }
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

const showDetailed = ref(false)
const orderDetailed = ref<Order>()
const distributorDetailed = ref<Distributor>()
function show (data: Order) {
  showDetailed.value = true
  orderDetailed.value = data
  distributorDetailed.value = allDistributors.value.find(({ code }) => data.distributor === code)
}

onMounted(() => loadOrders())
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box bg-white flex shrink-0">
      <div class="flex-auto flex">
        <button class="w-24 h-full" :class="{ 'ok-btn': isPrePay }" @click="changeTagPrePay">待支付</button>
        <button class="w-24 h-full" :class="{ 'ok-btn': isPreSend }" @click="changeTagPreSend">待发货</button>
        <button class="w-24 h-full" :class="{ 'ok-btn': isSended }" @click="changeTagSended">已发货</button>
        <div class="w-[1px] h-full bg-gray-400 mx-1"></div>
        <button class="w-24 h-full" :class="{ 'ok-btn': isPreCannel }" @click="changeTagPreCannel">待退单</button>
        <div class="w-[1px] h-full bg-gray-400 mx-1"></div>
        <button class="w-24 h-full" :class="{ 'ok-btn': isCannel }" @click="changeTagCannel">已退单</button>
        <button class="w-24 h-full" :class="{ 'ok-btn': isDone }" @click="changeTagDone">已完成</button>
        <button class="w-24 h-full" :class="{ 'ok-btn': isDel }" @click="changeTagDel">已删除</button>
      </div>
      <div>
        <button class="px-10" @click="loadOrders">刷新</button>
      </div>
      <div v-if="false">
        <input class="border-gray-400" type="text">
        <button>搜索</button>
      </div>
    </div>
    <div class="r-box bg-white flex-auto">
      <Table :columns="columns" :sizes="sizes">
        <tr class="text-center" v-for="item,index in showOrders">
          <td>{{index + 1}}</td>
          <td>{{item.code}}</td>
          <td>{{item.name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.address}}</td>
          <td>{{item.remarks}}</td>
          <td>¥{{item.total}}</td>
          <td class="text-gray-500">{{new Date(item.createdAt!).toLocaleString()}}</td>
          <td class="text-gray-500">{{allDistributors.find(({ code }) => code === item.distributor)?.name || ''}}</td>
          <td>
            <button class="ok-btn" @click="show(item)">详细</button>
            <button class="ok-btn ml-1" v-show="!isDone && !isDel" @click="update(item)">{{optTitle}}</button>
            <button class="cannel-btn ml-1" @click="remove(item, index)">{{isDel ? '彻底删除' : '删除'}}</button>
          </td>
        </tr>
      </Table>
    </div>
    <OrderInfo v-model:show="showDetailed" :order="orderDetailed!" :distributor="distributorDetailed!"></OrderInfo>
  </div>
</template>

<style></style>
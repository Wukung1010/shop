<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Order, OrderState } from '../types'
import QR from '../components/QR.vue'
import getStateTitle from './getStateTitle'
import ScrollLoad from '../components/ScrollLoad.vue'
import api from '../api'

const store = useStore()

const showOrderIndex = ref(-1)

let list = ref<Order[]>([])

function formatDate (dateStr: number) {
  const d = new Date(dateStr)
  let m = `${d.getMinutes()}`
  m = m.length === 1 ? `0${m}` : m
  let h = `${d.getHours()}`
  h = h.length === 1 ? `0${h}` : h
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${h}:${m}`
}

function show (index: number) {
  if (showOrderIndex.value === index) {
    showOrderIndex.value = -1
  } else {
    showOrderIndex.value = index
  }
}

const showQR = ref(false)
const curOrder = ref<Order>()
function pay (item: Order) {
  showQR.value = true
  curOrder.value = item
}

function cannelOrder (order: Order) {
  api.updateOrder(order.id, OrderState.PRE_CANNEL).then(() => search())
}

const tel = ref<string>('')
const telElement = ref<HTMLLinkElement>()
function callWaitter () {
  telElement.value?.click()
}

const loadding = ref(false)
function search () {
  loadding.value = true
  Promise.all([api.searchOrder(store.state.user.phone), api.getCommon()])
    .then(([orders, { phone }]) => {
      list.value = orders.filter((item: Order) => {
        return item.state !== OrderState.PRE_CANNEL && item.state !== OrderState.CANNEL && item.state !== OrderState.DEL
      })
      tel.value = phone
      loadding.value = false
    })
}

onMounted(() => {
  search()
})

</script>

<template>
  <div class="h-full bg-white overflow-auto flex flex-col">
    <ScrollLoad @load="search">
      <div class="flex-auto">
        <div v-show="list.length === 0" class="p-3 text-center text-zinc-400">{{loadding ? '加载中...' : '空空如也~'}}</div> <div v-for="item, index in list" :key="index" class="py-1 px-3 border-b" @click="show(index)"> <div class="flex">
            <span class="text-gray-500 text-sm block flex-auto">订单号:{{item.code}}</span>
            <span>{{getStateTitle(item.state)}}</span>
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
            <span class="text-sm text-gray-500">商品</span>
            <div class="flex" v-for="c in item.commodities">
              <div class="flex-auto">
                <span>{{c.title}}</span>
                <span class="ml-1">X{{c.buyCount}}</span>
              </div>
              <span>¥{{(c.price * c.buyCount).toFixed(2)}}</span>
            </div>
          </div>
          <div class="flex">
            <span class="text-gray-500 text-sm flex-auto">{{formatDate(item.createdAt as any)}}</span>
            <span class="text-rose-400">总价: ¥{{item.total}}</span>
          </div>
          <div class="text-sm text-right">
            <button class="py-1 px-1" @click.stop="cannelOrder(item)">退单</button>
            <button class="ml-2" @click.stop="callWaitter">联系客服</button>
            <button class="px-5 ml-1 bg-teal-400" v-if="item.state === OrderState.PRE_PAY" @click.stop="pay(item)">支付</button>
          </div>
        </div>
      </div>
    </ScrollLoad>
    <QR v-show="showQR" :price="curOrder?.total || 0" @cannel="showQR = false"/>
    <a v-show="false" ref="telElement" :href="'tel:'+tel"></a>
  </div>
</template>

<style></style>

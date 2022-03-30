<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CommodityInfo, Store, CommodityOrder } from '../types'
import User from './UserInfo.vue'
import CommodityList from './CommodityList.vue'
import Confirm from './Confirm.vue'
import api from '../api'
import { useStore } from 'vuex'

const store = useStore<Store>()

const router = useRouter()
const route = useRoute()

const list = reactive<(Partial<CommodityInfo> & { id: string, loadding?: boolean, buyCount?: number })[]>([])

watch(
  () => store.state.orders,
  (commodities) => {
    list.length = 0;
    (commodities as CommodityOrder[]).forEach(({ id, buyCount }) => {
      const index = list.length
      api.getCommodity(id).then((data) => list[index] = { ...data, buyCount })
      list.push({ id, loadding: true })
    })
  },
  {
    immediate: true,
    deep: true
  }
)

const totalPrice = ref('0')

watch(
  () => list,
  (list) => {
    let total = 0
    list.forEach((item, index) => {
      if (!item.loadding) {
        const { price } = item as CommodityInfo
        total += store.state.orders[index].buyCount * price
      }
    })
    totalPrice.value = total.toFixed(2)
  },
  {
    immediate: true,
    deep: true
  }
)

const comodityList = ref(false)

function showCommodity () {
  comodityList.value = true
}

function closeCommodity () {
  comodityList.value = false
}

function addCommodity (item: CommodityInfo) {
  store.commit('addToCart', { count: 1, commodity: item })
  closeCommodity()
}

const confirm = ref(false)

function submit () {
  if (store.state.user.name.length === 0) {
    // name not empty
  }
  if (store.state.user.adress.length === 0) {
    // adress not empty
  }
  
  confirm.value = true
}

function confirmSubmit () {
  api.submitOrder({
    id: `${performance.now()}`,
    totalPrice: totalPrice.value,
    created: Date.now(),
    userInfo: store.state.user,
    commodities: store.state.orders
  }).then(({ success }) => console.log(success))
  confirm.value = false
}

function cannelSubmit () {
  confirm.value = false
}

</script>

<template>
  <div class="h-full bg-white flex flex-col">
    <User />
    <div class="flex-auto overflow-auto border-t flex flex-col">
      <div v-for="item in list" :key="item.id" class="flex border-b h-22 pl-1">
        <div v-if="item.loadding" class="text-center">
          查询中...
        </div>
        <template v-else>
          <div class="flex-auto flex ml-4">
            <div class="flex-auto space-y-3">
              <span class="text-lg block">{{item.title}}</span>
              <span>¥{{item.price}}/{{item.priceUnit}}</span>
              <span class="text-sm block">库存: {{item.count}}</span>
            </div>
            <div class="flex flex-col w-10 text-center border-l">
              <div @click="store.commit('addToCart', { count: 1, commodity: item })" class="h-1/3">+</div>
              <div class="border-t border-b">
                <input type="number" v-model="item.buyCount" class="w-full border-none text-center">
              </div>
              <div @click="store.commit('addToCart', { count: -1, commodity: item })" class="h-1/3">-</div>
            </div>
            <div class="text-center w-14 bg-red-500 text-white flex items-center justify-center" @click="store.commit('removeFromCart', item.id)">
              <span>删除</span>
            </div>
          </div>
        </template>
      </div>
      <button class="bg-green-400 p-3" @click="showCommodity">添加新的商品</button>
    </div>
    <div class="flex border-t h-12">
      <div class="flex-auto text-lg text-red-500 flex flex-col justify-center px-5">
        <span>总价: {{totalPrice}}</span>
      </div>
      <div class="h-full w-24 text-center bg-green-500 flex flex-col justify-center" @click="submit">
        <span class="text-color">提交订单</span>
      </div>
    </div>
    <CommodityList v-show="comodityList" @ok="addCommodity" @cannel="closeCommodity"></CommodityList>
    <Confirm v-if="confirm" @ok="confirmSubmit" @cannel="cannelSubmit"></Confirm>
  </div>
</template>

<style></style>
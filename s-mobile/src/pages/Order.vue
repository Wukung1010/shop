<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Commodity } from '../../../types'
import User from '../components/UserInfo.vue'
import CommodityList from '../components/CommodityList.vue'
import Confirm from '../components/Confirm.vue'
import Warning from '../components/Warning.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Store } from '../store'

const router = useRouter()
const store = useStore<Store>()

const list = computed(() => store.state.order.commodities)

const showCommodityPanel = ref(false)
function addCommodity (item: Commodity) {
  store.commit('addToCart', { count: 1, commodity: item })
  showCommodityPanel.value = false
}

const showWarn = ref(false)
const warnMsg = ref<string[]>([])
function createOrder () {
  const state = store.state
  const warn = []
  if (state.user.name.length === 0) {
    warn.push('用户姓名不能为空')
  }
  if (state.user.address.length === 0) {
    warn.push('地址不能为空')
  }
  if (state.order.commodities.length === 0) {    
    warn.push('至少购买一件商品')
  }
  if (warn.length > 0) {
    warnMsg.value = warn
    showWarn.value = true
  } else {
    showConfirm.value = true
  }
}

const showConfirm = ref(false)
function confirmSubmit () {
  showConfirm.value = false
  store
    .dispatch('submitOrder')
    .then(() => {
      store.commit('clearCart')
      router.push('searchOrder')
    })
}

</script>

<template>
  <div class="h-full bg-white flex flex-col">
    <User />
    <div class="flex-auto overflow-auto border-t flex flex-col">
      <div v-for="item in list" :key="item.id" class="flex border-b h-22 pl-1">
        <div class="flex-auto flex ml-4">
          <div class="flex-auto space-y-3">
            <span class="text-lg block">{{item.title}}</span>
            <span>¥{{item.price}}/{{item.priceUnit}}</span>
            <span class="text-sm block">库存: {{item.count}}</span>
          </div>
          <div class="flex flex-col w-14 text-center border-l">
            <div @click="store.commit('addToCart', { count: 1, commodity: item })" class="h-1/3">+</div>
            <div class="border-t border-b">
              <input type="number" v-model="item.buyCount" class="w-full border-none text-center" @input="store.commit('addToCart', { count: ($event.target as any).value, commodity: item, flush: true })">
            </div>
            <div @click="store.commit('addToCart', { count: -1, commodity: item })" class="h-1/3">-</div>
          </div>
          <div class="text-center w-14 bg-rose-500 text-white flex items-center justify-center" @click="store.commit('removeFromCart', item.id)">
            <span>删除</span>
          </div>
        </div>
      </div>
      <button class="bg-teal-400 p-3" @click="showCommodityPanel = true">添加新的商品</button>
    </div>
    <div class="flex border-t h-12 shrink-0">
      <div class="flex-auto text-lg flex items-center px-2">
        <span class="text-rose-500">总价: ¥{{store.state.order.total}}</span>
      </div>
      <div class="h-full w-24 text-center bg-teal-400 flex flex-col justify-center" @click="createOrder">
        <span class="text-color">提交订单</span>
      </div>
    </div>
    <CommodityList v-show="showCommodityPanel" @ok="addCommodity" @cannel="showCommodityPanel = false"></CommodityList>
    <Confirm v-show="showConfirm" @ok="confirmSubmit" @cannel="showConfirm = false"></Confirm>
    <Warning v-show="showWarn" :msg="warnMsg" @cannel="showWarn = false" @ok="showWarn = false"/>
  </div>
</template>

<style></style>
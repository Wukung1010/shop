<script setup lang="ts">
import { useStore } from 'vuex'
import { Store } from '../types'

const store = useStore<Store>()

const emits = defineEmits<{
  (event: 'ok'): void;
  (event: 'cannel'): void;
}>()

function cannel () {
  emits('cannel')
}

function ok () {
  emits('ok')
}
</script>

<template>
  <div class="h-full w-full absolute top-0 left-0 flex flex-col justify-center p-3">
    <div class="h-full w-full absolute top-0 left-0 bg-gray-400/50" @click="cannel"></div>
    <div class="flex flex-col relative bg-white px-3 py-1">
      <span class="border-b py-1">确认信息</span>
      <div class="flex flex-col flex-auto">
        <span class="text-sm text-gray-400">地址信息</span>
        <span class="overflow-hidden text-ellipsis">{{store.state.user.name}} {{store.state.user.phone}}</span>
        <span class="overflow-hidden text-ellipsis">{{store.state.user.adress}}</span>
        <span class="overflow-hidden text-ellipsis">{{store.state.user.remarks}}</span>
        <span class="text-sm text-gray-400">商品信息</span>
        <div class="flex border-b" v-for="item in store.state.orders">
          <span class="flex-auto">{{item.title}} x {{item.buyCount}}</span>
          <span>¥{{(item.buyCount * item.price).toFixed(2)}}</span>
        </div>
      </div>
      <div class="flex border-t text-center pt-2">
        <div class="w-1/2 p-1" @click="cannel">取消</div>
        <div class="w-1/2 p-1 bg-green-400" @click="ok">下单</div>
      </div>
    </div>
  </div>
</template>

<style></style>
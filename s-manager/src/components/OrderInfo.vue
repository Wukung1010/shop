<script setup lang="ts">
import { ref } from 'vue'
import ColGroup from '../components/ColGroup.vue'
import { Order, Distributor } from '../types'

defineProps<{
  show: boolean;
  order: Order;
  distributor: Distributor;
}>()

defineEmits<{
  (event: 'update:show', arg: boolean): void;
}>()

const sizes = [ 50, 150, 100, 100, 100, 100 ]

const showUser = ref(true)
const showDistributor = ref(true)
</script>

<template>
  <div v-if="show" class="absolute w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
    <div class="absolute w-full h-full bg-gray-400/80" @click="$emit('update:show', false)"></div>
    <div class="r-box relative w-7/12 bg-white space-y-3 flex flex-col max-h-full">
      <div class="text-2xl flex border-b">
        <span class="flex-auto">订单详细信息</span>
        <span class="px-4 cursor-pointer" @click="$emit('update:show', false)">X</span>
      </div>
      <div class="flex-auto flex flex-col overflow-hidden text-xl space-y-3">
        <div class="flex flex-col shrink-0">
          <div class="bg-gray-200 rounded-md px-3 flex items-center" @click="showUser = !showUser">
            <span class="flex-auto">客户信息</span>
            <span class="text-gray-700 text-sm">{{showUser ? '收起' : '展开'}}</span>
          </div>
          <div v-show="showUser" class="px-3">
            <div class="flex">
              <div class="w-1/3">
                <span class="text-gray-500 text-lg">姓名</span>
                <span class="border-b">{{order.name}}</span>
              </div>
              <div>
                <span class="text-gray-500 text-lg">电话</span>
                <span class="border-b">{{order.phone}}</span>
              </div>
            </div>
            <div class="flex">
              <span class="text-gray-500 text-lg">地址</span>
              <span class="border-b">{{order.address}}</span>
            </div>
            <div class="flex">
              <span class="text-gray-500 text-lg">客户留言</span>
              <span class="border-b">{{order.remarks}}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col shrink-0" v-if="distributor">
          <div class="bg-gray-200 rounded-md px-3 flex items-center" @click="showDistributor = !showDistributor">
            <span class="flex-auto">分销人</span>
            <span class="text-gray-700 text-sm">{{showDistributor ? '收起' : '展开'}}</span>
          </div>
          <div v-show="showDistributor" class="px-3">
            <div class="flex">
              <div class="w-1/3">
                <span class="text-gray-500 text-lg">姓名</span>
                <span class="border-b">{{distributor.name}}</span>
              </div>
              <div>
                <span class="text-gray-500 text-lg">电话</span>
                <span class="border-b">{{distributor.phone}}</span>
              </div>
            </div>
            <div class="flex">
              <span class="text-gray-500 text-lg">地区</span>
              <span class="border-b">{{distributor.address}}</span>
            </div>
            <div class="flex">
              <span class="text-gray-500 text-lg">备注</span>
              <span class="border-b">{{distributor.remarks}}</span>
            </div>
          </div>
          </div>
        <div class="flex-auto flex flex-col overflow-hidden">
          <span class="w-full bg-gray-200 rounded-md px-3">商品信息</span>
          <div class="flex-auto flex flex-col overflow-hidden px-3">
            <table class="w-full text-center">
              <thead class="border-b">
                <th>序号</th>
                <th>商品名称</th>
                <th>商品价格</th>
                <th>运费</th>
                <th>购买数量</th>
                <th>合计</th>
              </thead>
              <ColGroup :sizes="sizes"></ColGroup>
            </table>
            <div class="flex-auto overflow-auto">
              <table class="w-full text-center">
                <ColGroup :sizes="sizes"></ColGroup>
                <tbody>
                  <tr v-for="item,index in order.commodities">
                    <td>{{index + 1}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.price}}/{{item.priceUnit}}</td>
                    <td>{{item.fare}}/{{item.priceUnit}}</td>
                    <td>{{item.buyCount}}</td>
                    <td>{{(item.price * item.buyCount + item.fare * item.buyCount).toFixed(2)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="flex flex-col shrink-0">
          <span class="w-full bg-gray-200 rounded-md">价格</span>
          <div class="px-3">
            <div class="flex">
              <span class="flex-auto">商品总价</span>
              <span>¥{{order.commoditiesPrice}}</span>
            </div>
            <div class="flex">
              <span class="flex-auto">运费</span>
              <span>¥{{order.farePrice}}</span>
            </div>
            <div class="flex">
              <span class="flex-auto">合计</span>
              <span>¥{{order.total}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
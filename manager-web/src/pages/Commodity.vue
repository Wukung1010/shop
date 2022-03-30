<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../api';
import { CommodityInfo } from '../types'

const list = ref<CommodityInfo[]>([])

onMounted(() => {
  api.getAllCommodity().then((data) => {
    data.forEach((item: any) => item.priceUnit = item.price_unit)
    list.value = data
  })
})
</script>

<template>
  <div class="w-full h-full flex flex-col p-5 space-y-3">
    <div class="flex">
      <div class="flex-auto">
        <button class="bg-green-400">添加新的商品</button>
      </div>
      <div>
        <input type="text">
        <button>搜索</button>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="space-y-3">
        <table>
          <colgroup>
            <col width="100">
            <col width="400">
          </colgroup>
          <tbody>
            <tr>
              <td><span>商品名称</span></td>
              <td><input class="w-full" type="text"></td>
            </tr>
            <tr>
              <td><span>商品价格</span></td>
              <td><input class="w-5/12" type="text"><span class="w-2/12 inline-block text-center">/</span><input class="w-5/12" type="text"></td>
            </tr>
            <tr>
              <td><span>运费</span></td>
              <td><input class="w-5/12" type="text"><span class="w-2/12 inline-block text-center">/</span><input class="w-5/12" type="text"></td>
            </tr>
            <tr>
              <td><span>库存</span></td>
              <td><input class="w-full" type="text"></td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <button>取消</button>
          <button class="bg-green-400 ml-2">确定</button>
        </div>
      </div>
    </div>
    <div class="flex-auto overflow-auto">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="text-left">商品名称</th>
            <th>商品价格</th>
            <th>运费</th>
            <th>库存</th>
            <th>操作</th>
          </tr>
        </thead>
        <colgroup>
          <col width="200">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="150">
        </colgroup>
        <tbody>
          <tr v-for="item in list">
            <td>{{item.title}}</td>
            <td class="text-right">{{item.price}}/{{item.priceUnit}}</td>
            <td class="text-right">{{item.price}}/{{item.priceUnit}}</td>
            <td class="text-right">{{item.count}}</td>
            <td class="flex justify-center"><button class="bg-green-400 p-1">修改</button><button class="bg-red-400 p-1 ml-1">删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
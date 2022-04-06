<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CommodityTd from '../components/CommotityTableItem.vue'
import api from '../api'
import type { Commodity } from '../../../types'

const commodities = ref<Commodity[]>([])

const adding = ref(false)
const createNew = () => ({
  title: '',
  price: 0,
  priceUnit: '袋',
  fare: 0,
  count: 10000, 
}) 
const newCommodity = ref(createNew())
function addNew () {
  newCommodity.value = createNew()
  adding.value = true
}
function checkCommodity () {
  let success = true
  if (newCommodity.value.title === '') {
    
  }
  if (newCommodity.value.price === 0) {

  }
  if (newCommodity.value.fare === 0) {

  }
  if (newCommodity.value.count === 0) {

  }
  return success
}
function submitCommodity () {
  if (checkCommodity()) {
    api
      .addCommodity(newCommodity.value)
      .then((data) => {
        commodities.value.unshift(data)
        commodities.value = commodities.value
        newCommodity.value = createNew()
        adding.value = false
      })
  } 
}

const loadding = ref(false)
function loadCommodity () {
  loadding.value = true
  api
    .getAllCommodities()
    .then((data) => (commodities.value = data, loadding.value = false))
}

function updateCommodity (item: Commodity, index: number) {
  api
    .updateCommodity(item)
    .then((data) => {
      commodities.value[index] = data
      commodities.value = commodities.value
    })
}
function removeCommodity (index: number) {
  const { id } = commodities.value[index]
  api
    .removeCommodity(`${id}`)
    .then(() => {
      commodities.value.splice(index, 1)
      commodities.value = commodities.value
    })
}

const searchTitle = ref('')
function search () {
  api
    .getSomeCommodities(searchTitle.value)
    .then((data) => commodities.value = data)
}

onMounted(() => loadCommodity())
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box flex bg-white shrink-0">
      <div class="flex-auto">
        <button class="px-8 py-2 bg-teal-400 hover:bg-teal-500" @click="addNew">新建商品</button>
      </div>
      <div class="flex">
        <input class="border-gray-400" v-model="searchTitle" type="text">
        <button @click="search">搜索</button>
      </div>
    </div>
    <div class="r-box bg-white space-y-3 shrink-0" v-show="adding">
      <div>
        <span class="text-gray-500">新建商品</span>
      </div>
      <div class="border-b border-t py-3 flex space-x-3">
        <div>
          <span>商品名称</span>
          <input class="input-b border-gray-500 w-96" type="text" v-model="newCommodity.title">
        </div>
        <div>
          <span>商品价格</span>
          <input class="input-b border-gray-500 w-20 text-right" type="number" v-model="newCommodity.price">元
          /
          <input class="input-b border-gray-500 text-center w-12" type="text" v-model="newCommodity.priceUnit">
        </div>
        <div>
          <span>运费</span>
          <input class="input-b border-gray-500 w-20 text-right" type="number" v-model="newCommodity.fare">元
          /
          <input class="input-b border-gray-500 text-center w-12" type="text" v-model="newCommodity.priceUnit">
        </div>
        <div>
          <span>库存</span>
          <input class="input-b border-gray-500 w-20" type="number" v-model="newCommodity.count">
        </div>
      </div>
      <div class="text-right">
        <button class="px-10" @click="adding = false">取消</button>
        <button class="px-10 bg-teal-400 hover:bg-teal-500" @click="submitCommodity">添加</button>
      </div>
    </div>
    <div class="r-box flex-auto flex flex-col bg-white overflow-hidden">
      <div>
        <table class="rounded-md w-full overflow-hidden">
          <thead class="text-xl h-10 bg-gray-200 whitespace-nowrap">
            <th>序号</th>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>运费</th>
            <th>库存</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作</th>
          </thead>
          <colgroup>
            <col width="30">
            <col width="200">
            <col width="90">
            <col width="90">
            <col width="90">
            <col width="100">
            <col width="100">
            <col width="80">
          </colgroup>
        </table>
      </div>
      <div class="flex-auto overflow-auto">
        <table class="w-full table-fixed">
          <colgroup>
            <col width="30">
            <col width="200">
            <col width="90">
            <col width="90">
            <col width="90">
            <col width="100">
            <col width="100">
            <col width="80">
          </colgroup>
          <tbody class="overflow-auto">
            <CommodityTd v-for="item,index in commodities" :index="index" :item="item" @update="(item: any) => updateCommodity(item, index)" @remove="removeCommodity(index)"></CommodityTd>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style></style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CommodityTd from '../components/CommotityTableItem.vue'
import Create from '../components/Create.vue'
import Table from '../components/Table.vue'
import api from '../api'
import type { Commodity, Sys } from '../types'

const common = ref<Sys>({ dFare: 0, dPriceUnit: '袋' })
const commodities = ref<Commodity[]>([])
const columns = [ '序号', '商品名称', '商品价格', '运费', '库存', '创建时间', '更新时间', '操作' ]
const sizes = [ 30, 200, 90, 90, 90, 100, 100, 80 ]

const adding = ref(false)
const createNew = () => ({
  title: '',
  price: 0,
  priceUnit: common.value.dPriceUnit,
  fare: common.value.dFare,
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
  Promise
    .all([api.getAllCommodities(), api.getCommon()])
    .then(([d1, d2]) => {
      commodities.value = d1
      common.value = d2[0]
      loadding.value = false
    })
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

function updateDfare () {
  api
    .updateCommon(common.value)
    .then(() => {
      loadCommodity()
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
        <span class="ml-10">运费</span>
        <input class="input-b w-20" type="number" v-model="common.dFare">
        <span>/</span>
        <span>{{common.dPriceUnit}}</span>
        <button class="ok-btn" @click="updateDfare">更新运费</button>
        <span class="text-rose-400">会更新所有商品的运费</span>
      </div>
      <div class="flex">
        <input class="border-gray-400" v-model="searchTitle" type="text">
        <button @click="search">搜索</button>
      </div>
    </div>
    <Create title="新建商品" v-model:show="adding" @ok="submitCommodity">
      <div>
        <span>商品名称</span>
        <input class="input-b w-96" type="text" v-model="newCommodity.title">
      </div>
      <div>
        <span>商品价格</span>
        <input class="input-b w-20 text-right" type="number" v-model="newCommodity.price">元
        /
        <input class="input-b text-center w-12" type="text" v-model="newCommodity.priceUnit">
      </div>
      <div>
        <span>运费</span>
        <input class="input-b w-20 text-right" type="number" v-model="newCommodity.fare">元
        /
        <input class="input-b text-center w-12" type="text" v-model="newCommodity.priceUnit">
      </div>
      <div>
        <span>库存</span>
        <input class="input-b w-20" type="number" v-model="newCommodity.count">
      </div>
    </Create>
    <div class="r-box flex-auto flex flex-col bg-white overflow-hidden">
      <Table :columns="columns" :sizes="sizes">
        <CommodityTd v-for="item,index in commodities" :index="index" :item="item" @update="(item: any) => updateCommodity(item, index)" @remove="removeCommodity(index)"></CommodityTd>
      </Table>
    </div>
  </div>
</template>

<style></style>
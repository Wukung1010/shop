<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Create from '../components/Create.vue'
import Table from '../components/Table.vue'
import DistributorTableItem from '../components/DistributorTableItem.vue'
import api from '../api'
import { Distributor } from '../types'

const columns = [ '序号', '电话', '姓名', '地址', '说明', '操作']
const sizes = [ 30, 100, 100, 200, 100, 180 ]
const distributors = ref<Distributor[]>([])

const adding = ref(false)
const newDistributor = ref(createDistributorTemp())
const phoneNull = ref(false)
const nameNull = ref(false)
function createDistributorTemp () {
  return {
    code: '',
    phone: '',
    name: '',
    address: '',
    remarks: '',
  }
}
function checkDistributor () {
  if (newDistributor.value.phone === '') {
    phoneNull.value = true
  }
  if (newDistributor.value.name === '') {
    nameNull.value = true
  }
  if (!phoneNull.value && !nameNull.value) {
    submitDistributor()
  }
}
function submitDistributor () {
  api
    .addDistributor(newDistributor.value)
    .then(() => {
      resetCreate()
      all()
    })
}
function resetCreate () {
  adding.value = false
  newDistributor.value = createDistributorTemp()
  phoneNull.value = false
  nameNull.value = false
}

function all () {
  api
    .getAllDistributors()
    .then((data) => distributors.value = data)
}


function update (item: Distributor) {
  api
    .updateDistributor(item)
    .then(() => all())
}

function del ({ id }: Distributor) {
  api
    .removeDistributor(`${id}`)
    .then(() => all())
}

function getQR (item: Distributor) {
  api
    .getQR(item)
}

onMounted(() => all())
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box bg-white shrink-0">
      <button class="px-8 py-2 ok-btn" @click="adding = true">添加新的分销员</button>
    </div>
    <Create title="新的分销员" v-model:show="adding" @ok="checkDistributor">
      <div class="flex">
        <span>电话</span>
        <div class="flex flex-col">
          <input class="input-b" :class="{ 'border-rose-400': phoneNull }" v-model="newDistributor.phone" type="text">
          <span class="text-rose-400">{{ phoneNull ? '不能为空' : ''}}</span>
        </div>
      </div>
      <div class="flex">
        <span>姓名</span>
        <div class="flex flex-col">
          <input class="input-b" :class="{ 'border-rose-400': nameNull }" v-model="newDistributor.name" type="text">
          <span class="text-rose-400">{{ nameNull ? '不能为空' : ''}}</span>
        </div>
      </div>
      <div>
        <span>地址</span>
        <input class="input-b" v-model="newDistributor.address" type="text">
      </div>
      <div>
        <span>说明</span>
        <input class="input-b" v-model="newDistributor.remarks" type="text">
      </div>
    </Create>
    <div class="r-box flex-auto bg-white">
      <Table :columns="columns" :sizes="sizes">
        <DistributorTableItem v-for="item,index in distributors" :index="index" :item="item" @qr="getQR(item)" @update="update" @remove="del(item)"></DistributorTableItem>
      </Table>
    </div>
  </div>
</template>

<style></style>
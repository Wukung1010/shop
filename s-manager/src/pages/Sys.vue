<script setup lang="ts">
import { ref } from 'vue'
import api from '../api'

const logo = '/api/manager/qr/logo'
const qr = '/api/manager/qr/business'

const sP = ref('')
const nP = ref('')
const nP2 = ref('')
const info = ref('')
const success = ref(false)

function changeP () {
  if (nP.value !== nP2.value) {
    info.value = '两次密码不相同'
    success.value = false
    return
  }
  api.changeP(sP.value, nP.value).then((s) => {
    if (s) {
      success.value = true
      sP.value = ''
      nP.value = ''
      nP2.value = ''
      info.value = '修改成功'
    } else {
      success.value = false
      info.value = '密码错误'
    }
  })
}
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">商家Logo</span>
      <div class="flex items-end px-3">
        <img class="w-24 h-24" :src="logo" alt="">
        <input v-if="false" type="file" filename="qr" accept="image/jpeg, image/png">
      </div>
    </div>
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">商家二维码</span>
      <div class="flex items-end px-3">
        <img class="w-24 h-24" :src="qr" alt="">
        <input v-if="false" type="file" filename="qr" accept="image/jpeg, image/png">
      </div>
    </div>
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">修改密码</span>
      <div class="space-y-3 px-3">
        <div>
          <span class="w-20 inline-block">原始密码</span>
          <input class="border border-gray-400" type="text" v-model="sP">
        </div>
        <div>
          <span class="w-20 inline-block">新密码</span>
          <input class="border border-gray-400" type="text" v-model="nP">
        </div>
        <div>
          <span class="w-20 inline-block">确认密码</span>
          <input class="border border-gray-400" type="text" v-model="nP2">
        </div>
        <button class="ok-btn" @click="changeP">确认修改</button>
        <span :class="{ 'text-teal-400': success, 'text-rose-400': !success }">{{info}}</span>
      </div>
    </div>
  </div>
</template>

<style></style>
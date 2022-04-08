<script setup lang="ts">
import { ref } from 'vue'

const logo = '/api/manager/qr/logo'
const qr = '/api/manager/qr/business'

const sP = ref('')
const nP = ref('')
const nP2 = ref('')
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">商家Logo</span>
      <div class="flex items-end px-3">
        <img class="w-24 h-24" :src="logo" alt="">
        <input type="file" filename="qr" accept="image/jpeg, image/png">
      </div>
    </div>
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">商家二维码</span>
      <div class="flex items-end px-3">
        <img class="w-24 h-24" :src="qr" alt="">
        <input type="file" filename="qr" accept="image/jpeg, image/png">
      </div>
    </div>
  </div>
  <div class="r-box bg-white space-y-3 flex flex-col">
    <span class="text-2xl border-b text-gray-500">修改密码</span>
    <div>
      <div>
        <span>原始密码</span>
        <input type="text" v-model="sP">
      </div>
      <div>
        <span>新密码</span>
        <input type="text" v-model="nP">
      </div>
      <div>
        <span>确认密码</span>
        <input type="text" v-model="nP2">
      </div>
      <button class="ok-btn">确认修改</button>
    </div>
  </div>
</template>

<style></style>
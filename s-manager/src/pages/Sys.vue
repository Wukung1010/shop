<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../api'

const logo = '/api/manager/qr/logo'
const qr = '/api/manager/qr/business'

const logoInfo = ref('上传')
const logoInput = ref()
const logoSrc = ref(`${logo}?t=${Date.now()}`)
function uploadLogo (event: Event) {
  const file = (event.target as any).files[0]
  const formData = new FormData()
  formData.set('file', file)
  logoInfo.value = '上传中...'
  api.updateLogo(formData).then(() => {
    logoSrc.value = `${logo}?t=${Date.now()}`
  }).finally(() => {
    logoInfo.value = '上传'
  })
}

const qrInfo = ref('上传')
const qrInput = ref()
const qrSrc = ref(`${qr}?t=${Date.now()}`)
function uploadQR (event: Event) {
  const file = (event.target as any).files[0]
  const formData = new FormData()
  formData.set('file', file)
  qrInfo.value = '上传中...'
  api.updateQR(formData).then(() => {
    qrSrc.value = `${qr}?t=${Date.now()}`
  }).finally(() => {
    qrInfo.value = '上传'
  })
}

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

const phone = ref<string>('')
function loadPhone () {
  api
    .getCommon()
    .then(({ phone: p }) => phone.value = p)
}
function updatePhone () {
  api.updatePhone(phone.value).then(() => loadPhone())
}
onMounted(() => loadPhone())
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-3">
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">商家Logo</span>
      <div class="flex items-end px-3">
        <img class="w-24 h-24" :src="logoSrc" alt="">
        <input v-show="false" ref="logoInput" @change="uploadLogo" type="file" accept="image/jpeg, image/png">
        <button class="ok-btn ml-5 px-10" @click="logoInput.click()">{{logoInfo}}</button>
      </div>
    </div>
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">商家二维码</span>
      <div class="flex items-end px-3">
        <img class="w-24 h-24" :src="qrSrc" alt="">
        <input v-show="false" ref="qrInput" @change="uploadQR" type="file" accept="image/jpeg, image/png">
        <button class="ok-btn ml-5 px-10" @click="qrInput.click()">{{qrInfo}}</button>
      </div>
    </div>
    <div class="r-box bg-white space-y-3 flex flex-col">
      <span class="text-2xl border-b text-gray-500">修改商家电话</span>
      <div>
        <input class="border border-gray-400" :value="phone" type="text">
        <button class="ok-btn ml-5 px-5" @click="updatePhone">更新电话</button>
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
        <button class="ok-btn px-5" @click="changeP">确认修改</button>
        <span :class="{ 'text-teal-400': success, 'text-rose-400': !success }">{{info}}</span>
      </div>
    </div>
  </div>
</template>

<style></style>

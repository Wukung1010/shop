<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Store } from '../types'

const store = useStore<Store>()

const router = useRouter()

const phone = ref('')

const warnInfo = ref('')

function login () {
  if (!/^1[3456789]\d{9}$/.test(phone.value)) {
    warnInfo.value = '请输入正确的手机号'    
  } else {
    warnInfo.value = ''
    store.commit('phone', phone.value)
    router.replace('/main/order')
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col space-y-24 bg-white p-10 text-2xl">
    <span class="text-3xl text-center">{{store.state.title}}</span>
    <div class="flex flex-col space-y-6">
      <span>请输入手机号</span>
      <div class="flex flex-col">
        <input type="text" v-model="phone" :class="{ 'border-rose-600': warnInfo.length !== 0 }">
        <span class="text-rose-600">{{warnInfo}}</span>
      </div>
      <button class="border bg-green-400 p-3" @click="login">登录</button>
    </div>
  </div>
</template>

<style></style>
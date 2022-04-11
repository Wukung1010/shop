<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import type { Store } from '../store'

const store = useStore<Store>()
const router = useRouter()

const phone = ref('')
const warnInfo = ref('')

const loadding = ref(false)
function login () {
  if (!/^1[3456789]\d{9}$/.test(phone.value)) {
    warnInfo.value = '请输入正确的手机号'    
  } else {
    warnInfo.value = ''
    loadding.value = true
    store.dispatch('loadCommodities').then(() => {
      loadding.value = false
      store.commit('phone', phone.value)
      router.replace('/main/order')
    })
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center space-y-6 bg-white px-10 text-1xl">
    <span class="text-2xl text-center py-10">{{store.state.title}}</span>
    <div class="flex flex-col space-y-3">
      <span>请输入手机号</span>
      <div class="flex flex-col">
        <input type="text" v-model="phone" :class="{ 'border-rose-600': warnInfo.length !== 0 }">
        <span class="text-rose-600">{{warnInfo}}</span>
      </div>
      <button class="border bg-teal-400 p-2" @click="login">
        <span v-show="!loadding">下一步</span>
        <span v-show="loadding">数据加载中...</span>
      </button>
    </div>
  </div>
</template>

<style></style>
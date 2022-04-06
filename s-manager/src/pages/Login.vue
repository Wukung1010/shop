<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '../components/Input.vue'
import api from '../api'
import { useRouter } from 'vue-router'

const router = useRouter()

const userName = ref('')
const userPas = ref('')

const userNameWarn = ref(false)
const userPasWarn = ref(false)

const warnInfo = {
  name: '用户名不能为空',
  pas: '用户密码不能为空',
  loginFail: '用户名或密码错误',
}

const nInfo = ref(warnInfo.name)
const pInfo = ref(warnInfo.pas)

watch(userName, () => userNameWarn.value = false)
watch(userPas, () => userPasWarn.value = false)

function check () {
  if (userName.value === '') {
    userNameWarn.value = true
  }
  if (userPas.value === '') {
    userPasWarn.value = true
  }
  return !userNameWarn.value && !userPasWarn.value
}

function login () {
  if (check()) {
    api
      .login({ user: userName.value, password: userPas.value })
      .then((data) => {
        if (data.success) {
          router.push('/main/commodity')
        } else {
          userPasWarn.value = true
          userNameWarn.value = true
          nInfo.value = warnInfo.loginFail
          pInfo.value = warnInfo.loginFail
        }
      })
  }
}
</script>

<template>
  <div class="w-full h-full flex bg-sky-500	 justify-center items-center">
    <div class="flex flex-col shadow-md bg-white rounded-md p-5 space-y-4 text-xl">
      <span class="text-2xl border-b">管理员登录</span>
      <div class="flex flex-col">
        <Input :warn="userNameWarn" :warn-info="nInfo" v-model:value="userName" type="text" placeholder="用户名"></Input> 
        <Input :warn="userPasWarn" :warn-info="pInfo" v-model:value="userPas" type="password" placeholder="密码" @keydown.enter="login"></Input> 
      </div>
      <button class="bg-teal-400 hover:bg-teal-500 py-2" @click="login">登录</button>
    </div>
  </div>
</template>

<style></style>
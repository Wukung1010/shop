<script setup lang="ts">
import { UserInfo } from '../types'
import { useStore } from 'vuex'

const store = useStore()

function change (key: string, e: Event) {
  const val = (e.target as HTMLInputElement|HTMLTextAreaElement).value
  store.commit('user', { [key]: val })
}

</script>

<template>
  <div class="flex flex-col py-2 px-5 space-y-3">
    <div>
      <span class="inline-block w-1/6">姓名</span>
      <input type="text" class="w-5/6" :value="store.state.user.name" @input="change('name', $event)">
    </div>
    <div>
      <span class="inline-block w-1/6">地址</span>
      <textarea class="w-5/6" :value="store.state.user.adress" @input="change('adress', $event)"></textarea>
    </div>
    <div>
      <span class="inline-block w-1/6">备注</span>
      <textarea class="w-5/6" :value="store.state.user.remarks" @input="change('remarks', $event)"></textarea>
    </div>
  </div>
</template>

<style></style>
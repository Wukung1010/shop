<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()

const store = useStore()

const main = computed(() => {
  return router.currentRoute.value.path !== '/main/searchOrder' && router.currentRoute.value.path !== '/main/searchChangeOrder'
})

const searchOrder = computed(() => {
  return router.currentRoute.value.path === '/main/searchOrder'
})

const searchChangeOrder = computed(() => {
  return router.currentRoute.value.path === '/main/searchChangeOrder'
})

function goMain () {
  router.replace('/main/order')
}

function goSearchOrder () {
  router.replace('/main/searchOrder')
}

function goSearchChangeOrder () {
  router.replace('/main/searchChangeOrder')
}
</script>

<template>
  <div class="w-full h-full overflow-hidden flex flex-col bg-white">
    <div class="h-14 bg-white flex items-center border-b box-border">
      <span class="flex-auto block text-center">
        {{ store.state.title }}
      </span>
    </div>
    <div class="flex-1 overflow-hidden">
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in">
          <Suspense>
            <component :is="Component"></component>
            <template #fallback>
              加载中...
            </template>
          </Suspense>
        </Transition>
      </RouterView>
    </div>
    <div class="h-14 flex flex-row bg-white border-t box-border">
      <div class="w-1/3 text-center text-base cursor-default flex items-center" @click="goMain">
        <span :class="{ block: true, 'w-full': true, 'text-center': true, 'text-zinc-400': !main }">下单</span>
      </div>
      <div class="w-1/3 text-center text-base cursor-default flex items-center" @click="goSearchOrder">
        <span :class="{ block: true, 'w-full': true, 'text-center': true, 'text-zinc-400': !searchOrder }">我的订单</span>
      </div>
      <div class="w-1/3 text-center text-base cursor-default flex items-center" @click="goSearchChangeOrder">
        <span :class="{ block: true, 'w-full': true, 'text-center': true, 'text-zinc-400': !searchChangeOrder }">我的退单</span>
      </div>
    </div>
  </div>
</template>

<style></style>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()

const curRouter = computed(() => route.path)

function goCommodity () {
  router.push('/commodity')
}

function goOrder () {
  router.push('/order')
}
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="h-20 text-4xl px-5 flex items-center bg-blue-800 text-white border-b">
      <span class="flex-auto">万顺丰建材配送商城</span>
      <button class="w-18 text-sm">注销</button>
    </div>
    <div class="flex-auto flex">
      <div class="h-full w-60 flex flex-col border-r">
        <div class="h-14 flex items-center border-b" @click="goCommodity">
          <span class="flex-auto p-3 text-lg">商品管理</span>
          <div class="h-full w-1 bg-green-500" v-show="curRouter === '/commodity'"></div>
        </div>
        <div class="h-14 flex items-center border-b" @click="goOrder">
          <span class="flex-auto p-3 text-lg">订单管理</span>
          <div class="h-full w-1 bg-green-500" v-show="curRouter === '/order'"></div>
        </div>
      </div>
      <div class="h-full flex-auto overflow-hidden">
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
    </div>
  </div>
</template>

<style></style>
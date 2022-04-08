<script setup lang="ts">
import Header from '../components/Header.vue'
import Menu from '../components/Menu.vue'
import { RouteLocationRaw, useRouter } from 'vue-router'
import { computed } from 'vue';

const router = useRouter()

const list = [
  { title: '商品管理', path: 'commodity' },
  { title: '订单管理', path: 'order' },
  { title: '分销员管理', path: 'distributor' },
  { title: '系统配置', path: 'sys' },
]

const curRoute = computed(() => router.currentRoute.value)

function go (item: { path: RouteLocationRaw; }) {
  router.push(item.path)
}
</script>

<template>
  <div class="w-full h-full flex flex-col p-3 space-y-3 bg-gray-300">
    <Header></Header>
    <div class="flex flex-auto space-x-3 overflow-hidden">
      <Menu :cur="curRoute.path" :list="list" @go="go"></Menu>
      <div class="flex-auto">
        <RouterView v-slot="{ Component }">
          <Transition>
            <KeepAlive>
              <Suspense>
                <component :is="Component"></component>
                <template #fallback>
                  努力加载中...
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style></style>
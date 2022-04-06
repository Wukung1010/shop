<script setup lang="ts">
import Error from './components/Error.vue'
</script>

<template>
  <div class="flex flex-col h-full">
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
    <Error></Error>
  </div>
</template>

<style>
</style>

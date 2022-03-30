<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

</script>

<template>
  <div class="flex flex-col bg-black h-full">
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
</template>

<style>
</style>

<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full">
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

<style></style>

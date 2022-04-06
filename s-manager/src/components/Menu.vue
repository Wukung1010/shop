<script setup lang="ts">
type MenuItem = {
  title: string;
  path: string;
}

defineProps<{
  cur: string;
  list: MenuItem[];
}>()

const emits = defineEmits<{
  (event: 'go', item: MenuItem): void
}>()

function go (item: MenuItem) {
  emits('go', item)
}
</script>

<template>
  <div class="r-box text-xl space-y-3 bg-white shrink-0">
    <div 
      class="px-10 py-5 rounded-md cursor-pointer text-center"
      :class="cur.includes(item.path) ? 'bg-teal-400' : 'hover:bg-gray-400/10'"
      v-for="item in list"
      @click="go(item)">
        <span>{{item.title}}</span>
    </div>
  </div>
</template>

<style></style>
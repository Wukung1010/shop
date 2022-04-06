<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Commodity } from '../../../types'

const props = defineProps<{
  index: number;
  item: Commodity;
}>()

const emit = defineEmits<{
  (event: 'update', item: Commodity): void;
  (event: 'remove'): void;
}>()

const editing = ref(false)
const title = ref(props.item.title)
const price = ref(props.item.price)
const fare = ref(props.item.fare)
const priceUnit = ref(props.item.priceUnit)
const count = ref(props.item.count)

watch(() => props.item, () => {
  editing.value = false
  title.value = props.item.title
  price.value = props.item.price
  fare.value = props.item.fare
  priceUnit.value = props.item.priceUnit
  count.value = props.item.count
})

const editingClass = computed(() => editing.value ? { 'shadow-outer': true, 'border-1': true, 'border-gray-400': true } : {})

function updating () {
  if (editing.value) {
    emit('update', { ...props.item, title: title.value, price: price.value, fare: fare.value, priceUnit: priceUnit.value, count: count.value })
  }
  editing.value = !editing.value
}
</script>

<template>
  <tr class="text-right border-b h-16 hover:bg-gray-400/10" :class="{ 'shadow-outer': editing, 'shadow-gray-400': editing }">
    <td class="text-center">
      {{index + 1}}
    </td>
    <td class="text-left">
      <input class="bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="title">
    </td>
    <td>
      <div class="flex overflow-hidden">
        <div class="flex-auto">
          <input class="w-full text-right bg-transparent" :class="editingClass" :disabled="!editing" type="number" v-model="price">
        </div>
        <span>/</span>
        <input class="w-14 bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="priceUnit">
      </div>
    </td>
    <td>
      <div class="flex overflow-hidden items-center">
        <div class="flex-auto">
          <input class="w-full text-right bg-transparent" :class="editingClass" :disabled="!editing" type="number" v-model="fare">
        </div>
        <span>/</span>
        <input class="w-14 bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="priceUnit">
      </div>
    </td>
    <td>
      <input class="bg-transparent" :class="editingClass" :disabled="!editing" type="number" v-model="count">
    </td>
    <td class="text-center text-gray-500">
      {{new Date(item.createdAt!).toLocaleString()}}
    </td>
    <td class="text-center text-gray-500">
      {{new Date(item.updatedAt!).toLocaleString()}}
    </td>
    <td class="text-center">
      <button class="bg-teal-400 hover:bg-teal-500" @click="updating">{{editing ? '确定更新' : '更新' }}</button>
      <button class="bg-rose-400 hover:bg-rose-500 ml-1" @click="$emit('remove')">删除</button>
    </td>
  </tr>
</template>

<style></style>
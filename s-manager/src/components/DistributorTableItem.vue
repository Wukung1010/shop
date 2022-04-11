<script setup lang="ts">
import { ref, computed } from 'vue'
import { Distributor } from '../types'

const props = defineProps<{
  index: number;
  item: Distributor;
}>()

const emit = defineEmits<{
  (event: 'update', item: Distributor): void;
  (event: 'remove'): void;
  (event: 'qr'): void;
}>()

const editing = ref(false)
const phone = ref(props.item.phone)
const name = ref(props.item.name)
const address = ref(props.item.address)
const remarks = ref(props.item.remarks)

const editingClass = computed(() => editing.value ? { 'shadow-outer': true, 'border-1': true, 'border-gray-400': true } : {})

function updating () {
  if (editing.value) {
    emit('update', { ...props.item, phone: phone.value, name: name.value, address: address.value, remarks: remarks.value })
  }
  editing.value = !editing.value
}
</script>

<template>
  <tr :class="{ 'text-center': true, 'shadow-outer': editing, 'shadow-gray-400': editing }">
    <td>
      {{index + 1}}
    </td>
    <td>
      <input class="bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="phone">
    </td>
    <td>
      <input class="bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="name">
    </td>
    <td class="text-left">
      <input class="bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="address">
    </td>
    <td class="text-left">
      <input class="bg-transparent" :class="editingClass" :disabled="!editing" type="text" v-model="remarks">
    </td>
    <td>
      <button class="ok-btn" @click="$emit('qr')">下载二维码</button>
      <button class="ok-btn ml-1" @click="updating">{{editing ? '确定更新' : '更新' }}</button>
      <button class="cannel-btn ml-1" @click="$emit('remove')">删除</button>
    </td>
  </tr>
</template>

<style></style>
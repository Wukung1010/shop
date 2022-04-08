<script setup lang="ts">
import { computed } from 'vue'
import { Order, OrderState } from '../types'

const props = defineProps<{
  state: OrderState;
  list: Order[];
}>()

defineEmits<{
  (event: 'update', item: Order): void
  (event: 'remove', item: Order, index: number): void
}>()

const needPay = computed(() => props.state === OrderState.PRE_PAY)
const realDel = computed(() => props.state === OrderState.DEL)
</script>

<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <div>
      <table class="w-full rounded-md overflow-hidden">
        <colgroup>
          <col width="60">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="80">
        </colgroup>
        <thead class="text-xl text-left h-10 bg-gray-200 whitespace-nowrap">
          <th class="text-center">序号</th>
          <th>姓名</th>
          <th>电话</th>
          <th>地址</th>
          <th>客户留言</th>
          <th class="text-right px-2">总价</th>
          <th class="text-center">创建时间</th>
          <th class="text-center">更新时间</th>
          <th class="text-center">操作</th>
        </thead>
      </table>
    </div>
    <div class="overflow-auto flex-auto">
      <table class="w-full">
        <colgroup>
          <col width="60">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="80">
        </colgroup>
        <tbody>
          <tr class="h-16 hover:bg-gray-400/10 border-b" v-for="item,index in list">
            <td class="text-center">{{index + 1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.address}}</td>
            <td>{{item.remarks}}</td>
            <td class="text-right px-2">¥{{item.total}}</td>
            <td class="text-center text-gray-500">{{new Date(item.createdAt!).toLocaleString()}}</td>
            <td class="text-center text-gray-500">{{new Date(item.updatedAt!).toLocaleString()}}</td>
            <td class="text-center">
              <div>
                <button class="bg-teal-400 hover:bg-teal-500" v-show="needPay" @click="$emit('update', item)">支付完成</button>
                <button class="bg-rose-400 hover:bg-rose-500 ml-1" @click="$emit('remove', item, index)">{{realDel ? '彻底删除' : '删除'}}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
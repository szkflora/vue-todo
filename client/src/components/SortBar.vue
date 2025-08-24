<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { ref, defineEmits } from 'vue';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/outline';
import { SortOrder } from '../types/Task';

const emit = defineEmits<{
  (e: 'sort', order: SortOrder, property: string): void;
}>();

interface SortData {
  title: SortOrder;
  description: SortOrder;
  importance: SortOrder;
  dueDate: SortOrder;
}

const props = defineProps<{ data: SortData }>();

const orders: Record<string, SortOrder> = {
  'title': SortOrder.UNO,
  'description': SortOrder.UNO,
  'importance': SortOrder.UNO,
  'dueDate': SortOrder.UNO
}

const property = ref<string>('');

function changeProperty(newProperty: string): void {
  property.value = newProperty;

  switch (orders[property.value]) {
    case SortOrder.UNO:
      orders[property.value] = SortOrder.ASC;
      break;
    case SortOrder.ASC:
      orders[property.value] = SortOrder.DSC;
      break;
    case SortOrder.DSC:
      orders[property.value] = SortOrder.UNO;
      break;
  }

  emit('sort', orders[property.value], property.value);
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full flex justify-between items-center flex-wrap my-3 md:my-5 gap-2">
      <div class="flex justify-start gap-2 md:gap-3.5">
        <BaseButton type="bar" :class="['default', data.title]" @click="changeProperty('title')"
          >Title
        </BaseButton>
        <BaseButton
          type="bar"
          :class="['default', data.description]"
          @click="changeProperty('description')"
          >Description
        </BaseButton>
        <BaseButton
          type="bar"
          :class="['default', data.importance]"
          @click="changeProperty('importance')"
          >Priority</BaseButton
        >
        <BaseButton type="bar" :class="['default', data.dueDate]" @click="changeProperty('dueDate')"
          >Date</BaseButton
        >
      </div>
      <div class="flex justify-end gap-3.5">
        <BaseButton type="bar" class="default ascending">
          <ArrowUpIcon class="w-4"></ArrowUpIcon>
        </BaseButton>
        <BaseButton type="bar" class="default descending">
          <ArrowDownIcon class="w-4"></ArrowDownIcon>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.default {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.ascending {
  background-color: #38cb89;
  color: white;
}

.descending {
  background-color: black;
  color: white;
}

.unorganized {
  background-color: white;
  border-width: 1.5px;
  border-color: black;
}
</style>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { ref, reactive, defineEmits } from 'vue';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  (e: 'sort', order: string, property: string): void;
}>();

type SortOrder = 'ascending' | 'descending' | 'unorganized';

const data = reactive<{
  title: SortOrder;
  description: SortOrder;
  priority: SortOrder;
  date: SortOrder;
}>({
  title: 'unorganized',
  description: 'unorganized',
  priority: 'unorganized',
  date: 'unorganized',
});

const order = ref<string>('unorganized');
const property = ref<string>('');

function changeOrder(newOrder: string): void {
  order.value = newOrder;
}

function changeProperty(newProperty: string): void {
  property.value = newProperty;

  if (data[newProperty as keyof typeof data] === (order.value as SortOrder)) {
    data[newProperty as keyof typeof data] = 'unorganized';
    order.value = 'unorganized';
  } else {
    data[newProperty as keyof typeof data] = order.value as SortOrder;
  }
  emit('sort', order.value, property.value);
}
</script>

<template>
  <div class="w-[600px] flex justify-between items-center m-6">
    <div class="flex justify-start gap-3.5">
      <BaseButton html-type="button" type="bar" :class="['default', data.title]" @click="changeProperty('title')"
        >Title
      </BaseButton>
      <BaseButton
        html-type="button"
        type="bar"
        :class="['default', data.description]"
        @click="changeProperty('description')"
        >Description
      </BaseButton>
      <BaseButton html-type="button" type="bar" :class="['default', data.priority]" @click="changeProperty('priority')"
        >Priority</BaseButton
      >
      <BaseButton html-type="button" type="bar" :class="['default', data.date]" @click="changeProperty('date')"
        >Date</BaseButton
      >
    </div>
    <div class="flex justify-end gap-3.5">
      <BaseButton html-type="button" type="bar" class="default ascending" @click="changeOrder('ascending')">
        <ArrowUpIcon class="w-4"></ArrowUpIcon>
      </BaseButton>
      <BaseButton html-type="button" type="bar" class="default descending" @click="changeOrder('descending')">
        <ArrowDownIcon class="w-4"></ArrowDownIcon>
      </BaseButton>
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

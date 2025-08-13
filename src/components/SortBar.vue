<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { ref, defineEmits } from 'vue';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  (e: 'sort', order: string, property: string): void;
}>();

type SortOrder = 'ascending' | 'descending' | 'unorganized';

interface SortData {
  title: SortOrder;
  description: SortOrder;
  importance: SortOrder;
  date: SortOrder;
}

const props = defineProps<{ data: SortData }>();

const order = ref<string>('unorganized');
const property = ref<string>('');

function changeOrder(newOrder: string): void {
  order.value = newOrder;
}

function changeProperty(newProperty: string): void {
  property.value = newProperty;
  emit('sort', order.value, property.value);
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-[348px] md:w-[600px] flex justify-between items-center flex-wrap m-2 gap-2">
      <div class="flex justify-start gap-2 md:gap-3.5">
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
        <BaseButton
          html-type="button"
          type="bar"
          :class="['default', data.importance]"
          @click="changeProperty('importance')"
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

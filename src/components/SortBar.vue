<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { ref, watch, defineEmits } from 'vue';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  (e: 'sort', order: string, property: string): void;
}>();

const order = ref<string>('unorganized');
const property = ref<string>('');

function changeOrder(newOrder: string): void {
  order.value = newOrder;
}

function changeProperty(newProperty: string): void {
  if (property.value === newProperty) {
    order.value = 'unorganized';
  } else {
    property.value = newProperty;
  }
}

watch([order, property], ([newOrder, newProperty]) => {
  if (newProperty !== '') {
    emit('sort', newOrder, newProperty);
  }
  property.value = '';
});
</script>

<template>
  <div class="w-[600px] flex justify-between items-center m-6">
    <div class="flex justify-start gap-3.5">
      <BaseButton html-type="button" type="bar" class="default" @click="changeProperty('title')">Title </BaseButton>
      <BaseButton html-type="button" type="bar" class="default" @click="changeProperty('description')"
        >Description
      </BaseButton>
      <BaseButton html-type="button" type="bar" class="default" @click="changeProperty('priority')"
        >Priority</BaseButton
      >
      <BaseButton html-type="button" type="bar" class="default" @click="changeProperty('date')">Date</BaseButton>
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

.inactive {
  background-color: white;
  border-width: 1.5px;
  border-color: black;
}
</style>

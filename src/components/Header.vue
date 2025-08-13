<script setup lang="ts">
import { defineEmits } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue';

const emit = defineEmits<{
  (e: 'showForm'): void;
}>();

function showTaskForm(): void {
  emit('showForm');
  console.log('hmmm');
}
</script>

<template>
  <div class="flex justify-between items-center px-8 pb-4 w-[410px] md:w-[664px]">
    <h1 class="text-3xl md:text-7xl text-black pb-2">To do list</h1>
    <BaseButton html-type="button" class="w-9 md:w-12 bg-[#38cb89] text-white" @click="showTaskForm">
      <PlusIcon />
    </BaseButton>
  </div>
</template>

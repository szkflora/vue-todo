<script setup lang="ts">
import { defineEmits } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/BaseButton.vue';

const emit = defineEmits<{
  (e: 'showForm'): void;
}>();

function showTaskForm(): void {
  emit('showForm');
}
</script>

<template>
  <div class="flex justify-between items-center mb-4 w-full">
    <h1 class="text-3xl md:text-7xl text-black pb-2">To do list</h1>
    <BaseButton type="default" class="w-9 md:w-12" @click="showTaskForm">
      <PlusIcon />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  (e: 'showForm'): void;
}>();

function showTaskForm(): void {
  emit('showForm');
}
</script>

<template>
  <div class="flex justify-between items-center px-4">
    <h1 class="text-7xl text-black">To do list</h1>
    <button
      type="button"
      class="w-12 h-12 bg-[#38cb89] text-[white] border-[none] rounded-[50%]"
      @click="showTaskForm"
    >
      <PlusIcon></PlusIcon>
    </button>
  </div>
</template>

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
    <h1 class="title">To do list</h1>
    <button type="button" class="plus-button" @click="showTaskForm">
      <PlusIcon></PlusIcon>
    </button>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Neue Haas Grotesk Display Pro';
  font-weight: 600;
  font-size: 72px;
  /* line-height: 100%;
  letter-spacing: 0%; */
  color: #000000;
}

.plus-button {
  width: 50px;
  height: 50px;
  border: none;
  background-color: #38cb89;
  cursor: pointer;
  color: white;
  border-radius: 50%;
}
</style>

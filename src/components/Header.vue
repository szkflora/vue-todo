<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { Task, Importance } from '../types/Task';
import { PlusIcon } from '@heroicons/vue/24/outline';

// const emit = defineEmits<{
//   (e: 'addSmthToDo', task: Task): void;
// }>();

// const testTask = ref<Task>({
//   id: 1,
//   title: 'task',
//   description: 'i should make this',
//   importance: Importance.MEDIUM,
//   completed: false,
// });

// function addTask(task: Task): void {
//   emit('addSmthToDo', task);
// }
const emit = defineEmits<{
  (e: 'showForm'): void;
}>();

function showTaskForm(): void {
  emit('showForm');
}
</script>

<template>
  <div class="w-[500px] flex justify-between">
    <h1 class="title">To do list</h1>
    <!-- <button type="button" class="plus-button" @click="addTask(testTask)"> -->
    <button type="button" class="plus-button" @click="showTaskForm">
      <PlusIcon></PlusIcon>
    </button>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Neue Haas Grotesk Display Pro';
  font-weight: 600;
  size: 72px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #000000;
}

.plus-button {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #38cb89;
  cursor: pointer;
  color: white;
  border-radius: 50%;
}
</style>

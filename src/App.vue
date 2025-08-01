<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import type { Task, Importance } from './types/Task';

const tasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);

// function addTask(task: Task): void {
//   tasks.value.push(task);
// }

function showTaskForm(): void {
  isFormVisible.value = true;
}
</script>

<template>
  <header>
    <Header @showForm="showTaskForm"></Header>
  </header>

  <main>
    <div v-show="isFormVisible">
      <TaskForm></TaskForm>
    </div>
  </main>
</template>

<style scoped></style>

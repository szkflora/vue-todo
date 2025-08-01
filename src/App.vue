<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';
import type { Task, Importance } from './types/Task';

const tasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);

function showTaskForm(): void {
  isFormVisible.value = true;
}

function handleTask(newTask: Task): void {
  tasks.value.push(newTask);
  isFormVisible.value = false;
}
</script>

<template>
  <header>
    <Header @showForm="showTaskForm"></Header>
  </header>

  <main>
    <div v-show="isFormVisible">
      <TaskForm @taskCreated="handleTask"></TaskForm>
    </div>
    <div>
      <div v-for="task in tasks" :key="task.id">
        <TaskCard :task="task"></TaskCard>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

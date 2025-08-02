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
    <div v-if="tasks.length !== 0">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard :task="task"></TaskCard>
      </div>
    </div>
    <div v-else class="placeholder">
      <img src="../public/no_todos.svg" />
    </div>
  </main>
</template>

<style scoped>
.placeholder {
  margin: 40px;
  text-align: center;
}
</style>

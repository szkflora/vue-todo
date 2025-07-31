<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import type { Task, Importance } from './types/Task';

const tasks = ref<Task[]>([]);

function addTask(task: Task): void {
  tasks.value.push(task);
}
</script>

<template>
  <header>
    <Header @addSmthToDo="addTask"></Header>
  </header>

  <main></main>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';
import type { Task, Importance } from './types/Task';

const tasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

function handleTaskSubmission(data: { newTask: Task; mode: 'create' | 'edit'}): void {
  
  if (data.mode === 'create') {
    tasks.value.push(data.newTask);
  } else {
    const index = tasks.value.findIndex(t => t.id === data.newTask.id);
    tasks.value[index] = data.newTask;
  }
  taskToEdit.value = null;
  isFormVisible.value = false;
  console.log(data.newTask.id);
}

function intoEditMode(task: Task): void {
  taskToEdit.value = task;
  isFormVisible.value = true;
}
</script>

<template>
  <header>
    <Header @showForm="showEmptyTaskForm"></Header>
  </header>

  <main>
    <div v-show="isFormVisible">
      <TaskForm :initialTask="taskToEdit" @taskSubmitted="handleTaskSubmission"></TaskForm>
    </div>
    <div v-if="tasks.length !== 0">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard
        v-if="task.id !== taskToEdit?.id"
        :task="task" 
        @click="intoEditMode(task)">
      </TaskCard>
      </div>
    </div>
    <div v-else-if="!isFormVisible" class="placeholder">
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

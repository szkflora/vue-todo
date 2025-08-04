<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';
import ConfirmationPopup from './components/ConfirmationPopup.vue'
import type { Task } from './types/Task';

const tasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);
const showConfirmation = ref<boolean>(false);
const taskToDelete = ref<Task>();

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

function handleTaskSubmission(data: { newTask: Task; mode: 'create' | 'edit' }): void {
  if (data.mode === 'create') {
    tasks.value.push(data.newTask);
  } else {
    const index = tasks.value.findIndex((t) => t.id === data.newTask.id);
    tasks.value[index] = data.newTask;
  }
  taskToEdit.value = null;
  isFormVisible.value = false;
}

function handelConfirmation(task: Task): void {
  showConfirmation.value = true;
  taskToDelete.value = task;
}

function cancelDeletion(): void {
  showConfirmation.value = false;
}

function handleTaskDeletion(): void {
  tasks.value = tasks.value.filter((task) => task.id !== taskToDelete.value.id);
  isFormVisible.value = false;
  showConfirmation.value = false;
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
      <TaskForm
        :initialTask="taskToEdit"
        @taskSubmitted="handleTaskSubmission"
        @confirmDeletion="handelConfirmation"
      ></TaskForm>
    </div>

    <div v-if="showConfirmation" class="popup">
      <!-- <p>This operation is permanent. Are you sure you want to delete this item?</p>
      <button type="button" @click="handleTaskDeletion" class="popup_button">Delete</button>
      <button type="button" @click="cancelDeletion" class="popup_button">Cancel</button> -->
      <ConfirmationPopup @cancel="cancelDeletion" @delete="handleTaskDeletion"></ConfirmationPopup>
    </div>

    <div v-if="tasks.length !== 0" class="flex flex-col-reverse">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard v-if="task.id !== taskToEdit?.id" :task="task" @clickEvent="intoEditMode"> </TaskCard>
      </div>
    </div>
    <div v-else-if="!isFormVisible" class="placeholder">
      <img src="../public/no_todos.svg" />
    </div>
  </main>
</template>

<style scoped>
.popup_button {
  background-color: #ffffff;
  color: #000000;
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 17px;
  margin: 10px;
}

.placeholder {
  margin: 40px;
  text-align: center;
}

.popup {
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  border: 2px solid #8e8e8e;
  border-radius: 16px;
  padding: 8px 16px;
  margin: 25px;
  font-family: 'Neue Haas Grotesk Display Pro';
  color: black;
}
</style>

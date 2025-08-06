<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';
import ConfirmationPopup from './components/ConfirmationPopup.vue';
import type { Task } from './types/Task';

const tasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);
const showConfirmation = ref<boolean>(false);
const taskToDelete = ref<Task>();
const idCounter = ref<number>(1);
const dialogRef = ref<InstanceType<typeof ConfirmationPopup> | null>(null);

function showDialog() {
  dialogRef.value?.openDialog();
}

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

function handleTaskSubmission(newTask: Task): void {
  if (newTask.id === 0) {
    newTask.id = idCounter.value;
    tasks.value.push(newTask);
    idCounter.value++;
  } else {
    const index = tasks.value.findIndex((t) => t.id === newTask.id);
    tasks.value[index] = newTask;
  }
  taskToEdit.value = null;
  isFormVisible.value = false;
}

function handleConfirmation(task: Task): void {
  showConfirmation.value = true;
  taskToDelete.value = task;
  showDialog();
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

function taskCheckedOrUnchecked(taskToCheck: Task): void {
  tasks.value = tasks.value.filter((task) => task.id !== taskToCheck.id);
  if (taskToCheck.completed === true) {
    tasks.value.unshift(taskToCheck);
  } else {
    tasks.value.push(taskToCheck);
  }
}
</script>

<template>
  <header>
    <Header @show-form="showEmptyTaskForm"></Header>
  </header>

  <main>
    <div v-if="isFormVisible">
      <TaskForm
        :model-value="taskToEdit"
        @task-submitted="handleTaskSubmission"
        @confirm-deletion="handleConfirmation"
      ></TaskForm>
    </div>

    <div v-if="showConfirmation">
      <ConfirmationPopup ref="dialogRef" @cancel="cancelDeletion" @delete="handleTaskDeletion"></ConfirmationPopup>
    </div>

    <div v-if="tasks.length" class="flex flex-col-reverse">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard
          v-if="task.id !== taskToEdit?.id"
          :task="task"
          @clickEvent="intoEditMode"
          @checked="taskCheckedOrUnchecked"
        >
        </TaskCard>
      </div>
    </div>
    <div v-else-if="!isFormVisible" class="text-center m-10">
      <img src="../public/no_todos.svg" />
    </div>
  </main>
</template>

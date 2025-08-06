<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';
import ConfirmationPopup from './components/ConfirmationPopup.vue';
import SearchBar from './components/SearchBar.vue';
import type { Task } from './types/Task';

const tasks = ref<Task[]>([]);
const filteredTasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);
const showConfirmation = ref<boolean>(false);
const taskToDelete = ref<Task>();
const idCounter = ref<number>(1);
const dialogRef = ref<InstanceType<typeof ConfirmationPopup> | null>(null);
const enableAnimation = ref<boolean>(false);
const searchword = ref<string>('');
const openPopup = ref<boolean>(true);

const tasksToShow = computed(() => {
  return searchword.value.trim() ? filteredTasks.value : tasks.value;
});

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

function handleTaskSubmission(newTask: Task): void {
  if (newTask.id === 0) {
    newTask.id = idCounter.value;
    tasks.value.unshift(newTask);
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
  enableAnimation.value = true;
  nextTick(() => {
    setTimeout(() => {
      tasks.value = tasks.value.filter((task) => task.id !== taskToCheck.id);
      if (taskToCheck.completed === true) {
        tasks.value.push(taskToCheck);
      } else {
        tasks.value.unshift(taskToCheck);
      }

      setTimeout(() => {
        enableAnimation.value = false;
      }, 500);
    }, 300);
  });
}

function searchAmongTasks(keyword: string): void {
  searchword.value = keyword.trim();
  filteredTasks.value = tasks.value.filter(
    (task) =>
      task.title.toLowerCase().includes(searchword.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchword.value.toLowerCase()),
  );
}
</script>

<template>
  <header>
    <Header @show-form="showEmptyTaskForm"></Header>
    <SearchBar v-show="tasks.length" @search="searchAmongTasks"></SearchBar>
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
      <ConfirmationPopup
        ref="dialogRef"
        :is-open="openPopup"
        @cancel="cancelDeletion"
        @delete="handleTaskDeletion"
      ></ConfirmationPopup>
    </div>

    <div v-if="tasks.length" class="flex flex-col">
      <TransitionGroup tag="div" :move-class="enableAnimation ? 'transition-transform duration-500 ease-in-out' : ''">
        <div v-for="task in tasksToShow" :key="task.id">
          <TaskCard
            v-if="task.id !== taskToEdit?.id"
            :task="task"
            @clickEvent="intoEditMode"
            @checked="taskCheckedOrUnchecked"
          >
          </TaskCard>
        </div>
      </TransitionGroup>
    </div>
    <div v-else-if="!isFormVisible" class="text-center m-10">
      <img src="../public/no_todos.svg" />
    </div>
  </main>
</template>

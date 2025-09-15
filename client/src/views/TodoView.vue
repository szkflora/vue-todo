<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskCard from '@/components/TaskCard.vue';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';
import SearchBar from '@/components/SearchBar.vue';
import { Task, SortOrder } from '@/types/Task';
import SortBar from '@/components/SortBar.vue';
import BaseButton from '@/components/BaseButton.vue';
import Header from '@/components/Header.vue';
import { useTaskStore } from '@/stores/tasks';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRoute } from 'vue-router';
import { HttpResponse } from '@/types/api';

const taskStore = useTaskStore();

interface TokenPayload extends JwtPayload {
  firstName: string;
  lastName: string;
}

const taskError = ref<string[]>();
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);
const taskToDelete = ref<Task>();
const enableAnimation = ref<boolean>(false);
const route = useRoute();

const sortData = ref<{
  title: SortOrder;
  description: SortOrder;
  importance: SortOrder;
  dueDate: SortOrder;
}>({
  title: (route.query.title as SortOrder) || SortOrder.UNO,
  description: (route.query.description as SortOrder) || SortOrder.UNO,
  importance: (route.query.importance as SortOrder) || SortOrder.UNO,
  dueDate: (route.query.dueDate as SortOrder) || SortOrder.UNO,
});

const searchWord = ref<string>((route.query.keyword as string) || '');
const openPopup = ref<boolean>(false);
const firstName = ref<string>('');
const lastName = ref<string>('');

const sortedTasks = computed(() => {
  return [...taskStore.tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
});

onMounted(async () => {
  await taskStore.getTaskCount();
  const { status: serverStatus, error: serverErrors } = await taskStore.getTasks(
    searchWord.value.toLowerCase(),
    sortData.value,
  );
  if (serverStatus === 200) {
    const token = localStorage.getItem('authToken');
    const decoded = jwtDecode(token) as TokenPayload;
    firstName.value = decoded.firstName;
    lastName.value = decoded.lastName;
    searchAmongTasks(searchWord.value);
  } else {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
  }
});

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

async function handleTaskUpdate(newTask: Task): Promise<HttpResponse> {
  const index = taskStore.getTaskIndexById(newTask._id);
  const originalTask = taskStore.tasks[index];
  let res: HttpResponse = {
    status: 200,
    error: { general: ['Not Modified'] },
  };
  if (originalTask.importance !== newTask.importance) {
    res = await taskStore.handleTaskImportanceUpdate(index, newTask);
  }

  if (originalTask.title !== newTask.title || originalTask.description !== newTask.description) {
    res = await taskStore.handleTaskTextUpdate(index, newTask);
  }

  return res;
}

async function handleTaskSubmission(newTask: Task) {
  let res;
  if (newTask._id === null) {
    res = await taskStore.handleTaskSubmission(newTask);
  } else {
    res = await handleTaskUpdate(newTask);
  }

  if (res?.status !== 200 && res?.status !== 201) {
    taskError.value = res?.error?.server;
    return;
  }

  taskToEdit.value = null;
  isFormVisible.value = false;
  await taskStore.getTaskCount();

  for (const property in sortData.value) {
    sortData.value[property as keyof typeof sortData.value] = SortOrder.UNO;
  }
}

function handleConfirmation(task: Task): void {
  taskToDelete.value = task;
  openPopup.value = true;
}

function cancelDeletion(): void {
  openPopup.value = false;
}

async function handleTaskDeletion() {
  taskStore.handleTaskDeletion(taskToDelete.value);
  isFormVisible.value = false;
  openPopup.value = false;
  await taskStore.getTaskCount();
}

function intoEditMode(task: Task): void {
  taskToEdit.value = task;
  isFormVisible.value = true;
}

function handleCheckAction(taskToCheck: Task): void {
  enableAnimation.value = true;
  const newState = !taskToCheck.completed;
  nextTick(() => {
    setTimeout(() => {
      const index = taskStore.getTaskIndexById(taskToCheck._id);

      taskStore.handleTaskStateUpdate(index, taskToCheck, newState);

      setTimeout(() => {
        enableAnimation.value = false;
      }, 500);
    }, 300);
  });
}

async function searchAmongTasks(keyword: string) {
  searchWord.value = keyword.trim();
  await taskStore.getTasks(searchWord.value.toLowerCase(), sortData.value);
}

async function handleSort(order: SortOrder, property: string) {
  const key = property as keyof typeof sortData.value;
  sortData.value[key] = order;
  await taskStore.getTasks(searchWord.value.toLowerCase(), sortData.value);
}

function logout(): void {
  localStorage.removeItem('authToken');
  window.location.href = '/tasks';
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="text-2xl font-bold mb-4">
        <p>Welcome</p>
        <p>{{ firstName }} {{ lastName }}</p>
      </div>
      <BaseButton @click="logout" class="bg-[#E5E5E5] hover:bg-[#d7d7d7]">Log out</BaseButton>
    </div>
    <Header @show-form="showEmptyTaskForm" />
    <SearchBar v-show="taskStore.taskCount" :keyword="searchWord" @search="searchAmongTasks" />
    <SortBar :sortData @sort="handleSort" v-show="taskStore.taskCount" />

    <div v-if="isFormVisible" class="flex items-center justify-center">
      <TaskForm
        :model-value="taskToEdit"
        :error="taskError"
        @task-submitted="handleTaskSubmission"
        @confirm-deletion="handleConfirmation"
      />
    </div>

    <ConfirmationPopup :is-open="openPopup" @cancel="cancelDeletion" @delete="handleTaskDeletion" />

    <div v-if="taskStore.tasks.length" class="flex flex-col items-center justify-center">
      <TransitionGroup tag="div" :move-class="enableAnimation ? 'transition-transform duration-500 ease-in-out' : ''">
        <div v-for="task in sortedTasks" :key="task._id ? task._id.toString() : 'newTask'">
          <TaskCard v-if="task._id !== taskToEdit?._id" :task @clickEvent="intoEditMode" @checked="handleCheckAction" />
        </div>
      </TransitionGroup>
    </div>
    <div v-else-if="!isFormVisible && !taskStore.taskCount" class="flex items-center justify-center">
      <img class="m-10 w-[300px] md:w-[410px]" src="/public/no_todos.svg" />
    </div>
  </div>
</template>

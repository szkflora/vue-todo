<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted } from 'vue';
import Header from './components/Header.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';
import ConfirmationPopup from './components/ConfirmationPopup.vue';
import SearchBar from './components/SearchBar.vue';
import { Task, Importance } from './types/Task';
import SortBar from './components/SortBar.vue';
import { SortOrder } from './types/Task';
import BaseButton from './components/BaseButton.vue';
import AuthForm from './components/AuthForm.vue';

const sortPriority = ['title', 'description', 'importance', 'date'];
const importanceOrder: Record<Importance, number> = {
  [Importance.LOW]: 1,
  [Importance.MEDIUM]: 2,
  [Importance.HIGH]: 3,
};

const tasks = ref<Task[]>([]);

onMounted(async () => {
  const res = await fetch("http://localhost:3000/tasks");
  tasks.value = await res.json();
});

const filteredTasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);
const taskToDelete = ref<Task>();
const idCounter = ref<number>(1);
const enableAnimation = ref<boolean>(false);
const data = reactive<{
  title: SortOrder;
  description: SortOrder;
  importance: SortOrder;
  date: SortOrder;
}>({
  title: SortOrder.UNO,
  description: SortOrder.UNO,
  importance: SortOrder.UNO,
  date: SortOrder.UNO,
});
const searchWord = ref<string>('');
const openPopup = ref<boolean>(false);
const loggedIn = ref<boolean>(true);
const authMode = ref<string>('');

const tasksToShow = computed(() => (searchWord.value.trim() ? filteredTasks.value : tasks.value));

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

function handleTaskSubmission(newTask: Task): void {
  if (newTask._id === 0) {
    newTask._id = idCounter.value;
    tasks.value.unshift(newTask);
    idCounter.value++;
  } else {
    const index = tasks.value.findIndex((t) => t._id === newTask._id);
    tasks.value[index] = newTask;
  }
  taskToEdit.value = null;
  isFormVisible.value = false;

  for (const property in data) {
    data[property as keyof typeof data] = SortOrder.UNO;
  }
}

function handleConfirmation(task: Task): void {
  taskToDelete.value = task;
  openPopup.value = true;
}

function cancelDeletion(): void {
  openPopup.value = false;
}

function handleTaskDeletion(): void {
  tasks.value = tasks.value.filter((task) => task._id !== taskToDelete.value._id);
  isFormVisible.value = false;
  openPopup.value = false;
}

function intoEditMode(task: Task): void {
  taskToEdit.value = task;
  isFormVisible.value = true;
}

function handleCheckAction(taskToCheck: Task): void {
  enableAnimation.value = true;
  nextTick(() => {
    setTimeout(() => {
      tasks.value = tasks.value.filter((task) => task._id !== taskToCheck._id);
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
  searchWord.value = keyword.trim();
  filteredTasks.value = tasks.value.filter(
    (task) =>
      task.title.toLowerCase().includes(searchWord.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchWord.value.toLowerCase()),
  );
}

function handleSort(order: SortOrder, property: string): void {
  const key = property as keyof typeof data;

  data[key] = order;

  const tasksClone = [...(searchWord.value.trim() ? filteredTasks.value : tasks.value)];
  const activeSorters = sortPriority.filter((prop) => data[prop] !== SortOrder.UNO);

  tasksClone.sort((a, b) => {
    for (const prop of activeSorters) {
      if (a[prop] !== b[prop]) {
        const direction = data[prop] === SortOrder.ASC ? 1 : -1;

        const aVal = a[prop];
        const bVal = b[prop];

        if (prop === 'importance') {
          const aImp = importanceOrder[aVal as Importance];
          const bImp = importanceOrder[bVal as Importance];
          if (aImp !== bImp) return (aImp - bImp) * direction;
        } else if (aVal instanceof Date) {
          if (aVal.getTime() !== bVal.getTime()) {
            return (aVal.getTime() - bVal.getTime()) * direction;
          }
        } else {
          const comp = aVal.localeCompare(bVal);
          if (comp !== 0) return comp * direction;
        }
      }
    }
    return 0;
  });

  if (searchWord.value.trim()) {
    filteredTasks.value = tasksClone;
  } else {
    tasks.value = tasksClone;
  }
}

function setAuthMode(mode: string): void {
  authMode.value = mode;
}
</script>

<template>
  <div class="w-[328px] md:w-[600px] mx-2">
    <div v-if="loggedIn">
      <BaseButton>Log out</BaseButton>
      <Header @show-form="showEmptyTaskForm" />
      <SearchBar v-show="tasks.length" @search="searchAmongTasks" />
      <SortBar :data="data" @sort="handleSort" v-show="tasks.length" />

      <div v-if="isFormVisible" class="flex items-center justify-center">
        <TaskForm
          :model-value="taskToEdit"
          @task-submitted="handleTaskSubmission"
          @confirm-deletion="handleConfirmation"
        />
      </div>

      <ConfirmationPopup :is-open="openPopup" @cancel="cancelDeletion" @delete="handleTaskDeletion" />

      <div v-if="tasks.length" class="flex flex-col items-center justify-center">
        <TransitionGroup tag="div" :move-class="enableAnimation ? 'transition-transform duration-500 ease-in-out' : ''">
          <div v-for="task in tasksToShow" :key="task._id">
            <TaskCard v-if="task._id !== taskToEdit?._id" :task @clickEvent="intoEditMode" @checked="handleCheckAction" />
          </div>
        </TransitionGroup>
      </div>
      <div v-else-if="!isFormVisible" class="flex items-center justify-center">
        <img class="m-10 w-[300px] md:w-[410px]" src="../public/no_todos.svg" />
      </div>
    </div>
    <div v-else-if="!authMode">
      <BaseButton class="mr-[10px] md:mr-[20px]" @click="setAuthMode('login')">Login</BaseButton>
      <BaseButton @click="setAuthMode('signin')">Sign in</BaseButton>
    </div>
    <div v-else-if="!authMode">
      <BaseButton @click="setAuthMode('login')">Login</BaseButton>
      <BaseButton @click="setAuthMode('signin')">Sign in</BaseButton>
    </div>
    <div v-else>
      <AuthForm :mode="authMode"/>
    </div>
  </div>
</template>

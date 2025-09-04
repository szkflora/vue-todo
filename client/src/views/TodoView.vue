<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskCard from '@/components/TaskCard.vue';
import ConfirmationPopup from '@/components/ConfirmationPopup.vue';
import SearchBar from '@/components/SearchBar.vue';
import { Task, Importance } from '@/types/Task';
import SortBar from '@/components/SortBar.vue';
import { SortOrder } from '@/types/Task';
import BaseButton from '@/components/BaseButton.vue';
import Header from '@/components/Header.vue';
import { useTaskStore } from '@/stores/tasks';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const taskStore = useTaskStore();

interface TokenPayload extends JwtPayload {
  firstName: string;
  lastName: string;
}

const sortPriority = ['title', 'description', 'importance', 'dueDate'];
const importanceOrder: Record<Importance, number> = {
  [Importance.LOW]: 1,
  [Importance.MEDIUM]: 2,
  [Importance.HIGH]: 3,
};

onMounted(async () => {
  const res = await taskStore.getTasks();
  console.log(res);
  if (res === 200) {
    const token = localStorage.getItem('authToken');
    const decoded = jwtDecode(token) as TokenPayload;
    firstName.value = decoded.firstName;
    lastName.value = decoded.lastName;
  } else {
    localStorage.removeItem('authToken');
    window.location.href = '/signin';
  }
});

const filteredTasks = ref<Task[]>([]);
const isFormVisible = ref<boolean>(false);
const taskToEdit = ref<Task | null>(null);
const taskToDelete = ref<Task>();
const enableAnimation = ref<boolean>(false);
const data = reactive<{
  title: SortOrder;
  description: SortOrder;
  importance: SortOrder;
  dueDate: SortOrder;
}>({
  title: SortOrder.UNO,
  description: SortOrder.UNO,
  importance: SortOrder.UNO,
  dueDate: SortOrder.UNO,
});
const searchWord = ref<string>('');
const openPopup = ref<boolean>(false);
const tasksToShow = computed(() => (searchWord.value.trim() ? filteredTasks.value : taskStore.tasks));
const orderedTasks = computed(() => {
  return [...tasksToShow.value].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
});

const firstName = ref<string>('');
const lastName = ref<string>('');

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

async function handleTaskUpdate(newTask: Task) {
  const index = taskStore.getTaskIndexById(newTask._id);
  const originalTask = taskStore.tasks[index];
  if (originalTask.importance !== newTask.importance) {
    taskStore.handleTaskImportanceUpdate(index, newTask);
  }

  if (originalTask.title !== newTask.title || originalTask.description !== newTask.description) {
    taskStore.handleTaskTextUpdate(index, newTask);
  }
}

async function handleTaskSubmission(newTask: Task) {
  if (newTask._id === null) {
    taskStore.handleTaskSubmission(newTask);
  } else {
    handleTaskUpdate(newTask);
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

async function handleTaskDeletion() {
  taskStore.handleTaskDeletion(taskToDelete.value);
  isFormVisible.value = false;
  openPopup.value = false;
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

function searchAmongTasks(keyword: string): void {
  searchWord.value = keyword.trim();
  filteredTasks.value = taskStore.tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchWord.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchWord.value.toLowerCase()),
  );
}

function handleSort(order: SortOrder, property: string): void {
  const key = property as keyof typeof data;

  data[key] = order;

  const tasksClone = [...(searchWord.value.trim() ? filteredTasks.value : taskStore.tasks)];
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
    taskStore.tasks = tasksClone;
  }
}

function logout(): void {
  localStorage.removeItem('authToken');
  window.location.href = '/tasks';
}

function signin(): void {
  window.location.href = '/signin';
}

function signup(): void {
  window.location.href = '/signup';
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
    <SearchBar v-show="taskStore.tasks.length" @search="searchAmongTasks" />
    <SortBar :data @sort="handleSort" v-show="taskStore.tasks.length" />

    <div v-if="isFormVisible" class="flex items-center justify-center">
      <TaskForm
        :model-value="taskToEdit"
        @task-submitted="handleTaskSubmission"
        @confirm-deletion="handleConfirmation"
      />
    </div>

    <ConfirmationPopup :is-open="openPopup" @cancel="cancelDeletion" @delete="handleTaskDeletion" />

    <div v-if="taskStore.tasks.length" class="flex flex-col items-center justify-center">
      <TransitionGroup tag="div" :move-class="enableAnimation ? 'transition-transform duration-500 ease-in-out' : ''">
        <div v-for="task in orderedTasks" :key="task._id ? task._id.toString() : 'newTask'">
          <TaskCard v-if="task._id !== taskToEdit?._id" :task @clickEvent="intoEditMode" @checked="handleCheckAction" />
        </div>
      </TransitionGroup>
    </div>
    <div v-else-if="!isFormVisible" class="flex items-center justify-center">
      <img class="m-10 w-[300px] md:w-[410px]" src="/public/no_todos.svg" />
    </div>
  </div>
</template>

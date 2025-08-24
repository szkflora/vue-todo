<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted } from 'vue';
import Header from '../components/Header.vue';
import TaskForm from '../components/TaskForm.vue';
import TaskCard from '../components/TaskCard.vue';
import ConfirmationPopup from '../components/ConfirmationPopup.vue';
import SearchBar from '../components/SearchBar.vue';
import { Task, Importance } from '../types/Task';
import SortBar from '../components/SortBar.vue';
import { SortOrder } from '../types/Task';
import BaseButton from '../components/BaseButton.vue';

const sortPriority = ['title', 'description', 'importance', 'dueDate'];
const importanceOrder: Record<Importance, number> = {
  [Importance.LOW]: 1,
  [Importance.MEDIUM]: 2,
  [Importance.HIGH]: 3,
};

const tasks = ref<Task[]>([]);

onMounted(async () => {
  const res = await fetch('http://localhost:3000/tasks');
  tasks.value = await res.json();
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
const tasksToShow = computed(() => (searchWord.value.trim() ? filteredTasks.value : tasks.value));
const orderedTasks = computed(() => {
  return [...tasksToShow.value].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
});

function showEmptyTaskForm(): void {
  isFormVisible.value = true;
  taskToEdit.value = null;
}

async function handleTaskImportanceUpdate(index: number, task: Task) {
  await fetch(`http://localhost:3000/tasks/${task._id}/importance`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ importance: task.importance }),
  });
  tasks.value[index].importance = task.importance;
}

async function handleTaskStateUpdate(index: number, task: Task, newState: boolean) {
  await fetch(`http://localhost:3000/tasks/${task._id}/completed`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ completed: newState }),
  });
  tasks.value[index].completed = newState;
}

async function handleTaskTextUpdate(index: number, task: Task) {
  await fetch(`http://localhost:3000/tasks/${task._id}/text`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ title: task.title, description: task.description }),
  });
  tasks.value[index].title = task.title;
  tasks.value[index].description = task.description;
}

async function handleTaskUpdate(newTask: Task) {
  const index = tasks.value.findIndex((t) => t._id === newTask._id);
  const originalTask = tasks.value[index];
  if (originalTask.importance !== newTask.importance) {
    handleTaskImportanceUpdate(index, newTask);
  }

  if (originalTask.title !== newTask.title || originalTask.description !== newTask.description) {
    handleTaskTextUpdate(index, newTask);
  }
}

async function handleTaskSubmission(newTask: Task) {
  if (newTask._id === 0) {
    tasks.value.unshift(newTask);
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newTask),
    });
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
  tasks.value = tasks.value.filter((task) => task._id !== taskToDelete.value._id);
  await fetch(`http://localhost:3000/tasks/${taskToDelete.value._id}`, {
    method: 'DELETE',
  });
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
      const index = tasks.value.findIndex((t) => t._id === taskToCheck._id);

      handleTaskStateUpdate(index, taskToCheck, newState);

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
</script>

<template>
  <div>
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
        <div v-for="task in orderedTasks" :key="task._id">
          <TaskCard v-if="task._id !== taskToEdit?._id" :task @clickEvent="intoEditMode" @checked="handleCheckAction" />
        </div>
      </TransitionGroup>
    </div>
    <div v-else-if="!isFormVisible" class="flex items-center justify-center">
      <img class="m-10 w-[300px] md:w-[410px]" src="../public/no_todos.svg" />
    </div>
  </div>
</template>

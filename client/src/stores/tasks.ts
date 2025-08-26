import { Task } from '@/types/Task';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { URL } from '@/config';

export const useTaskStore = defineStore('taskstore', () => {
  const tasks = ref<Task[]>([]);

  async function getTasks() {
    const res = await fetch(`${URL}/tasks`);
    tasks.value = await res.json();
  }

  async function handleTaskImportanceUpdate(index: number, task: Task) {
    await fetch(`${URL}/tasks/${task._id}/importance`, {
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
    await fetch(`${URL}/tasks/${task._id}/completed`, {
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
    await fetch(`${URL}/tasks/${task._id}/text`, {
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

  async function handleTaskSubmission(newTask: Task) {
    tasks.value.unshift(newTask);
    await fetch(`${URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newTask),
    });
  }

  async function handleTaskDeletion(taskToDelete: Task) {
    tasks.value = tasks.value.filter((task) => task._id !== taskToDelete._id);
    await fetch(`${URL}/tasks/${taskToDelete._id}`, {
      method: 'DELETE',
    });
  }

  return {
    tasks,
    getTasks,
    handleTaskImportanceUpdate,
    handleTaskStateUpdate,
    handleTaskTextUpdate,
    handleTaskSubmission,
    handleTaskDeletion,
  }
});

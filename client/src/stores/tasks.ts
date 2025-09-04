import { Task } from '@/types/Task';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { URL } from '@/config';
import { Types } from 'mongoose';

export const useTaskStore = defineStore('taskstore', () => {
  const tasks = ref<Task[]>([]);

  async function getTasks() {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const status = res.status;
    if(status === 200){
      tasks.value = await res.json();
    }
    return status;
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
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    const created = await res.json();
    tasks.value.unshift(created);
  }

  async function handleTaskDeletion(taskToDelete: Task) {
    tasks.value = tasks.value.filter((task) => task._id !== taskToDelete._id);
    await fetch(`${URL}/tasks/${taskToDelete._id}`, {
      method: 'DELETE',
    });
  }

  function getTaskIndexById(id: Types.ObjectId) {
    return tasks.value.findIndex((t) => t._id === id);
  }

  return {
    tasks,
    getTasks,
    handleTaskImportanceUpdate,
    handleTaskStateUpdate,
    handleTaskTextUpdate,
    handleTaskSubmission,
    handleTaskDeletion,
    getTaskIndexById,
  }
});

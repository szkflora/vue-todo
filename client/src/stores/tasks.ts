import { Task } from '@/types/Task';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { URL } from '@/config';
import { Types } from 'mongoose';

export const useTaskStore = defineStore('taskstore', () => {
  const tasks = ref<Task[]>([]);

  async function getTasks(keyword: string) {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks/?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const status = res.status;
    const data = await res.json();
    if (status === 200) {
      tasks.value = data;
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskImportanceUpdate(index: number, task: Task) {
    const res = await fetch(`${URL}/tasks/${task._id}/importance`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ _id: task._id, importance: task.importance }),
    });

    const data = await res.json();
    const status = res.status;
    if (status === 200) {
      tasks.value[index].importance = task.importance;
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskStateUpdate(index: number, task: Task, newState: boolean) {
    const res = await fetch(`${URL}/tasks/${task._id}/completed`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ completed: newState }),
    });

    const data = await res.json();
    const status = res.status;
    if (status === 200) {
      tasks.value[index].completed = newState;
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskTextUpdate(index: number, task: Task) {
    const res = await fetch(`${URL}/tasks/${task._id}/text`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ title: task.title, description: task.description }),
    });

    const data = await res.json();
    const status = res.status;
    if (status === 200) {
      tasks.value[index].title = task.title;
      tasks.value[index].description = task.description;
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskSubmission(newTask: Task) {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    const status = res.status;
    if (status === 201) {
      tasks.value.unshift(data);
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskDeletion(taskToDelete: Task) {
    tasks.value = tasks.value.filter((task) => task._id !== taskToDelete._id);
    const res = await fetch(`${URL}/tasks/${taskToDelete._id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    const status = res.status;
    if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
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
  };
});

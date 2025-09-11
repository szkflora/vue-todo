import { Importance, SortData, Task } from '@/types/Task';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { URL } from '@/config';
import { Types } from 'mongoose';
import { HttpResponse } from '@/types/api';

function mapImportance(importance: number): Importance {
  switch (importance) {
    case 1:
      return Importance.LOW;
    case 2:
      return Importance.MEDIUM;
    default:
      return Importance.HIGH;
  }
}

export const useTaskStore = defineStore('taskstore', () => {
  const tasks = ref<Task[]>([]);
  const taskCount = ref<number>();

  async function getTaskCount(): Promise<HttpResponse> {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks/count`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const status = res.status;
    if (data.error) {
      return { status, error: data.error };
    }
    taskCount.value = data;
    return { status, error: {} };
  }

  async function getTasks(keyword: string, sortData: SortData): Promise<HttpResponse> {
    const token = localStorage.getItem('authToken');
    const res = await fetch(
      `${URL}/tasks/?keyword=${keyword}&title=${sortData.title}&description=${sortData.description}&importance=${sortData.importance}&dueDate=${sortData.dueDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const status = res.status;
    const data = await res.json();
    if (status === 200) {
      const mappedData = data.map((task) => ({
        ...task,
        importance: mapImportance(task.importance),
      }));
      tasks.value = mappedData;
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskImportanceUpdate(index: number, task: Task): Promise<HttpResponse> {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks/${task._id}/importance`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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

  async function handleTaskStateUpdate(index: number, task: Task, newState: boolean): Promise<HttpResponse> {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks/${task._id}/completed`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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

  async function handleTaskTextUpdate(index: number, task: Task): Promise<HttpResponse> {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${URL}/tasks/${task._id}/text`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
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

  async function handleTaskSubmission(newTask: Task): Promise<HttpResponse> {
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
      const mappedTask = {
        ...data,
        importance: mapImportance(data.importance),
      };
      tasks.value.unshift(mappedTask);
    } else if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  async function handleTaskDeletion(taskToDelete: Task): Promise<HttpResponse> {
    const token = localStorage.getItem('authToken');
    tasks.value = tasks.value.filter((task) => task._id !== taskToDelete._id);
    const res = await fetch(`${URL}/tasks/${taskToDelete._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const status = res.status;
    if (data.error) {
      return { status, error: data.error };
    }
    return { status, error: {} };
  }

  function getTaskIndexById(id: Types.ObjectId): number {
    return tasks.value.findIndex((t) => t._id === id);
  }

  return {
    tasks,
    taskCount,
    getTaskCount,
    getTasks,
    handleTaskImportanceUpdate,
    handleTaskStateUpdate,
    handleTaskTextUpdate,
    handleTaskSubmission,
    handleTaskDeletion,
    getTaskIndexById,
  };
});

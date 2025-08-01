<script setup lang="ts">
import { ref } from 'vue';
import { Task, Importance } from '../types/Task';

const title = ref<string>('');
const description = ref<string>('');
const importance = ref<Importance>(Importance.MEDIUM);

let idCounter = 1;

const emit = defineEmits<{
  (e: 'taskCreated', task: Task): void;
}>();

function createTask(): void {
  const newTask: Task = {
    id: idCounter++,
    title: title.value,
    description: description.value,
    importance: importance.value,
    completed: false,
  };

  emit('taskCreated', newTask);

  title.value = '';
  description.value = '';
  importance.value = Importance.MEDIUM;

  console.log(newTask);
}
</script>

<template>
  <input v-model="title" placeholder="Title" /><br />
  <input v-model="description" placeholder="Description" /><br />
  <p>
    Importance:
    <select v-model="importance" placeholder="Importance">
      <br />
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </p>
  <button type="button" @click="createTask">Create Task</button>
</template>

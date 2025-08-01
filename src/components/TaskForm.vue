<script setup lang="ts">
import { ref } from 'vue';
import { Task, Importance } from '../types/Task';

<<<<<<< HEAD
const title = ref<string>('');
const description = ref<string>('');
const importance = ref<Importance>(Importance.MEDIUM);

let idCounter = 1;
=======
const title = ref<string>('')
const description = ref<string>('')
const importance = ref<Importance>(Importance.MEDIUM)

let idCounter = 1
>>>>>>> 3fa1b57e9317774302b50f5c1f33ffc0a9cf2c90

function createTask(): Task {
  const newTask: Task = {
    id: idCounter++,
    title: title.value,
    description: description.value,
    importance: importance.value,
<<<<<<< HEAD
    completed: false,
  };

  title.value = '';
  description.value = '';
  importance.value = Importance.MEDIUM;

  console.log(newTask);

  return newTask;
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
=======
    completed: false
  }

  title.value = ''
  description.value = ''
  importance.value = Importance.MEDIUM

  console.log(newTask)

  return newTask
}

</script>

<template>
  <input v-model="title" placeholder="Title" />
  <input v-model="description" placeholder="Description" />
  <select v-model="importance" placeholder="Importance">
    <option value="Low"></option>
  </select>
>>>>>>> 3fa1b57e9317774302b50f5c1f33ffc0a9cf2c90
</template>

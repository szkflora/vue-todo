<script setup lang="ts">
import { ref } from 'vue';
import { Task, Importance } from '../types/Task';

const title = ref<string>('')
const description = ref<string>('')
const importance = ref<Importance>(Importance.MEDIUM)

let idCounter = 1

function createTask(): Task {
  const newTask: Task = {
    id: idCounter++,
    title: title.value,
    description: description.value,
    importance: importance.value,
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
</template>

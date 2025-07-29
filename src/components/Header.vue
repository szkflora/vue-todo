<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import type { Task, Importance } from '@/types/Task';

const emit = defineEmits<{
    (e: 'addSmthToDo', task: Task):void;
}>();

const testTask = ref<Task>({
id: 1,
title: 'task',
description: 'i should make this',
importance: 'Medium',
completed: false,
})

const addTask = (task: Task):void => {
    emit('addSmthToDo', task);
}

</script>

<template>
    <div class="header">
      <h1 class="title">To do list</h1>
      <button type="button" class="plus-button" @click="addTask(testTask)">
        <img src="@/components/icons/plus-button-icon.svg"></img>
      </button>
    </div>
</template>

<style scoped>

.header {
  width: 500px;
  display: flex;
  justify-content: space-between;
}

.title {
  font-family: "Neue Haas Grotesk Display Pro";
  font-weight: 600;
  size: 72px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #000000;
}

.plus-button {
  width: 40px;
  height: 40px;
  border: none;
  background-color: white;
  cursor: pointer;
}
</style>

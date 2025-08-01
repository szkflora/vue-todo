<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Task } from '../types/Task';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
</script>

<template>
  <h1>{{ props.task.title }}</h1>
</template>

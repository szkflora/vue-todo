<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Task } from '../types/Task';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="task">
    <div>
      <h1 class="text-[#000000] text-[42px] task_text">{{ props.task.title }}</h1>
      <p class="text-[#757575] text-[28px] task_text">{{ props.task.description }}</p>
    </div>
    <div>
      <p>{{ props.task.importance }}</p>
      <button type="button"></button>
    </div>
  </div>
</template>

<style scoped>
.task {
  width: 500px;
  display: flex;
  justify-content: space-between;
  border: 2px solid;
  border-radius: 16px;
  padding: 8px 16px;
  margin: 25px;
}

.task_text {
  font-family: 'Neue Haas Grotesk Display Pro';
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
}
</style>

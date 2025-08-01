<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Importance, Task } from '../types/Task';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

function getImportance(imp: Importance): string {
  switch (imp) {
    case Importance.LOW:
      return 'low';
    case Importance.MEDIUM:
      return 'medium';
    case Importance.HIGH:
      return 'high';
  }
}
</script>

<template>
  <div class="task">
    <div class="flex flex-col justify-between">
      <h1 class="text-[#000000] text-[42px] task_text">{{ props.task.title }}</h1>
      <p class="text-[#757575] text-[28px] task_text">{{ props.task.description }}</p>
    </div>
    <div class="flex flex-col justify-between">
      <p :class="getImportance(props.task.importance)">{{ props.task.importance }}</p>
      <button type="button" class="lil_button"></button>
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

.lil_button {
  width: 27px;
  height: 27px;
  border: 4px solid #000000;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  align-self: self-end;
}

.low {
  background-color: #38cbcb;
  padding: 2px 7px;
  border-radius: 16px;
  color: white;
}

.medium {
  background-color: #ffab00;
  padding: 2px 7px;
  border-radius: 16px;
  color: white;
}

.high {
  background-color: #ff481f;
  padding: 2px 7px;
  border-radius: 16px;
  color: white;
}
</style>

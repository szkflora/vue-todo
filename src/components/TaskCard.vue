<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Importance, Task } from '../types/Task';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'clickEvent', task: Task): void;
}>();

function handleClick(): void {
  emit('clickEvent', props.task);
}

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
  <div class="task h-[150px]" @click="handleClick">
    <div class="flex justify-between gap-16">
      <h1 class="text-[#000000] text-[42px] whitespace-nowrap w-[400px] overflow-hidden text-ellipsis task_text">
        {{ props.task.title }}
      </h1>
      <p :class="[getImportance(props.task.importance), 'w-[120px] h-[30px] tracking-[0px] text-center rounded-2xl']">
        {{ props.task.importance }}
      </p>
    </div>
    <div class="flex justify-between">
      <p class="text-[#757575] text-[28px] whitespace-nowrap w-[400px] overflow-hidden text-ellipsis task_text">
        {{ props.task.description }}
      </p>
      <button type="button" class="lil_button"></button>
    </div>
  </div>
</template>

<style scoped>
.lil_button {
  width: 27px;
  height: 27px;
  border: 4px solid #000000;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  align-self: self-end;
}
</style>

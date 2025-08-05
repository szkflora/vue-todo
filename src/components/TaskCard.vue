<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Task, Importance } from '../types/Task';

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
</script>

<template>
  <div class="task h-[150px]" @click="handleClick">
    <div class="flex justify-between gap-16">
      <h1 class="text-[#000000] text-[42px] whitespace-nowrap w-[400px] overflow-hidden text-ellipsis task_text">
        {{ task.title }}
      </h1>
      <p
        :class="[
          'text-white px-2 py-0.5 w-[120px] h-[30px] tracking-[0px] text-center rounded-2xl',
          {
            'bg-[#38cbcb]': task.importance === Importance.LOW,
            'bg-[#ffab00]': task.importance === Importance.MEDIUM,
            'bg-[#ff481f]': task.importance === Importance.HIGH,
          },
        ]"
      >
        {{ task.importance }}
      </p>
    </div>
    <div class="flex justify-between">
      <p class="text-[#757575] text-[28px] whitespace-nowrap w-[500px] overflow-hidden text-ellipsis task_text">
        {{ task.description }}
      </p>
      <button
        type="button"
        class="w-7 h-7 bg-[white] border-4 rounded-2xl border-solid border-black"
      ></button>
    </div>
  </div>
</template>

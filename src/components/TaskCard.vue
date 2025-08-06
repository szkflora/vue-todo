<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Importance, Task } from '../types/Task';
import { CheckIcon } from '@heroicons/vue/24/solid';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const isChecked = ref<boolean>(false);

const emit = defineEmits<{
  (e: 'clickEvent', task: Task): void;
  (e: 'checked', task: Task): void;
}>();

function handleClick(): void {
  emit('clickEvent', props.task);
}

function checkedTask(): void {
  isChecked.value = !isChecked.value;
  props.task.completed = !props.task.completed;
  emit('checked', props.task);
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
        :class="[
          'w-7 h-7 bg-[white] border-4 rounded-2xl border-solid',
          isChecked ? 'border-[#38cb89]' : 'border-[#000000]',
        ]"
        @click.stop="checkedTask"
      >
        <CheckIcon v-show="isChecked" class="w-[170%] relative -left-[5px] -top-2.5 text-[#38CB89]"></CheckIcon>
      </button>
    </div>
  </div>
</template>

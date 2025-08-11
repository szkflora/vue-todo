<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Importance, Task } from '../types/Task';
import { CheckIcon } from '@heroicons/vue/24/solid';
import { useDateFormat } from '@vueuse/core';
import { CalendarDaysIcon } from '@heroicons/vue/24/outline';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const formatted = useDateFormat(props.task.date, 'DD.MM.YY');

const emit = defineEmits<{
  (e: 'clickEvent', task: Task): void;
  (e: 'checked', task: Task): void;
}>();

function handleClick(): void {
  emit('clickEvent', props.task);
}

function checkedTask(): void {
  props.task.completed = !props.task.completed;
  emit('checked', props.task);
}
</script>

<template>
  <div class="task px-4 md:h-[150px]" @click="handleClick">
    <div class="flex justify-between md:gap-16">
      <div class="flex flex-col">
        <div>
          <h1 class="text-[#000000] text-[28px] md:text-[42px] whitespace-nowrap w-full overflow-hidden text-ellipsis task_text">
            {{ task.title }}
          </h1>
        </div>
        <div class="flex gap-1">
          <CalendarDaysIcon class="w-4"></CalendarDaysIcon>
          <p>
            {{ formatted }}
          </p>
        </div>
      </div>
      <p
        :class="[
          'text-white px-2 py-0.5 w-[80px] md:w-[120px] h-[20px] md:h-[30px] tracking-[0px] text-center rounded-2xl',
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
      <p class="text-[#757575] text-[20px] md:text-[28px] whitespace-nowrap w-full overflow-hidden text-ellipsis task_text">
        {{ task.description }}
      </p>
      <button
        type="button"
        :class="[
          'w-7 h-7 bg-[white] border-4 rounded-2xl border-solid',
          task.completed ? 'border-[#38cb89]' : 'border-[#000000]',
        ]"
        @click.stop="checkedTask"
      >
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 scale-50"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-500 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-50"
        >
          <CheckIcon v-show="task.completed" class="w-[170%] relative -left-[5px] -top-2.5 text-[#38CB89]"></CheckIcon>
        </Transition>
      </button>
    </div>
  </div>
</template>

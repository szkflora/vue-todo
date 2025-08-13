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
  <div
    class="task px-4 w-[348px] md:w-[600px] justify-between md:flex-col mx-3 md:mx-5 my-6 md:my-10"
    @click="handleClick"
  >
    <div class="flex justify-center self-center md:hidden">
      <button
        type="button"
        :class="[
          'w-7 h-7 bg-white border-4 rounded-[50%] border-solid',
          task.completed ? 'border-[#38cb89]' : 'border-black',
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
          <CheckIcon v-show="task.completed" class="w-[170%] relative -left-[5px] -top-2.5 text-[#38CB89]" />
        </Transition>
      </button>
    </div>
    <div class="flex justify-between md:gap-16 md:pb-4">
      <div class="flex flex-col">
        <div>
          <h1
            class="text-black text-[28px] md:text-[42px] w-[160px] md:w-[340px] h-[40px] md:h-[50px] whitespace-nowrap overflow-hidden text-ellipsis task_text"
          >
            {{ task.title }}
          </h1>
        </div>
        <div class="flex gap-1">
          <CalendarDaysIcon class="w-4" />
          <p>
            {{ formatted }}
          </p>
        </div>
      </div>
      <div
        :class="[
          'hidden md:flex justify-center items-center text-white px-2 py-0.5 w-[80px] md:w-[120px] h-[20px] md:h-[30px] tracking-[0px] rounded-2xl',
          {
            'bg-[#38cbcb]': task.importance === Importance.LOW,
            'bg-[#ffab00]': task.importance === Importance.MEDIUM,
            'bg-[#ff481f]': task.importance === Importance.HIGH,
          },
        ]"
      >
        {{ task.importance }}
      </div>
    </div>
    <div class="hidden md:flex justify-between gap-10">
      <p
        class="text-[#757575] text-[20px] md:text-[28px] whitespace-nowrap overflow-hidden text-ellipsis task_text w-[450px]"
      >
        {{ task.description }}
      </p>
      <button
        type="button"
        :class="[
          'w-7 h-7 bg-white border-4 rounded-[50%] border-solid',
          task.completed ? 'border-[#38cb89]' : 'border-black',
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
          <CheckIcon v-show="task.completed" class="w-[170%] relative -left-[5px] -top-2.5 text-[#38CB89]" />
        </Transition>
      </button>
    </div>
    <div
      :class="[
        'flex md:hidden justify-center items-center px-2 py-0.5 w-[20px] h-[20px] tracking-[0px] rounded-2xl',
        {
          'bg-[#38cbcb]': task.importance === Importance.LOW,
          'bg-[#ffab00]': task.importance === Importance.MEDIUM,
          'bg-[#ff481f]': task.importance === Importance.HIGH,
        },
      ]"
    ></div>
  </div>
</template>

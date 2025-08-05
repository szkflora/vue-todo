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
  emit('checked', props.task)
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
      <button type="button" :class="['lil_button', isChecked? 'checked' : 'unchecked']" @click.stop="checkedTask">
        <CheckIcon v-show="isChecked" class="w-[170%] relative -left-[5px] -top-2.5 text-[#38CB89]"></CheckIcon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lil_button {
  width: 27px;
  height: 27px;
  border: 4px solid;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  align-self: self-end;
}

.unchecked {
  border-color: #000000;
}

.checked {
  border-color: #38CB89;
}
</style>

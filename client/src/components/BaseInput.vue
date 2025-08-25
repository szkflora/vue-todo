<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  text: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

</script>

<template>
  <div flex items-center>
    <label pr-0.5>{{ props.text }}</label>
    <input class='bg-[white] h-[26px] pl-1 rounded-md border-[none]' :value="props.modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"/><br />
    <slot />
  </div>
</template>

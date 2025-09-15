<script setup lang="ts">
import { defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    text: string;
    modelValue: string;
    type?: 'text' | 'password';
    error?: string;
  }>(),
  {
    type: 'text',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 mb-2">
    <label pr-0.5 class="text-md font-medium text-[gray]">{{ props.text }}</label>
    <input
      :type="props.type"
      class="bg-[#f8f6f6] w-full rounded-md px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#38cb89]"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="props.error" class="text-[red] text-sm">
      {{ props.error }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = withDefaults(defineProps<{
  text: string;
  modelValue: string;
  type?: 'text' | 'password';
  error?: string;
}>(), {
  type: 'text',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div>
    <label pr-0.5 class="block text-md font-medium text-[gray] mb-2 mt-4">{{ props.text }}</label>
    <div>
      <input
        :type="props.type"
        class="bg-[#f8f6f6] block w-full rounded-md px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#38cb89] mb-2"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <p v-if="props.error" class="text-[red] text-sm">
        {{ props.error }}
      </p>
    </div>
    <slot />
  </div>
</template>

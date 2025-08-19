<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { ref, watch, defineEmits } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const keyword = ref<string>('');

let debounceId: number | null = null;

const emit = defineEmits<{
  (e: 'search', keyword: string): void;
}>();

function handleSearch(): void {
  emit('search', keyword.value);
  keyword.value = '';
}

watch(keyword, () => {
  if(debounceId != null) {
    clearTimeout(debounceId);
  }

  debounceId = window.setTimeout(() => {
    emit('search', keyword.value);
  }, 1000);
});
</script>

<template>
  <form @submit.prevent="handleSearch" class="flex justify-center">
    <div
      class="w-full h-[40px] flex justify-between items-center my-3 md:my-5 rounded-xl border-2 border-solid"
    >
      <div class="flex gap-3">
        <MagnifyingGlassIcon class="w-6 pl-1" />
        <input v-model="keyword" class="task_text md:w-[480px]" placeholder="Search todos..." />
      </div>
      <div class="flex items-center pr-1">
        <BaseButton html-type="submit" type="bar" class="bg-black text-white flex items-center justify-center text-sm"
          >Search</BaseButton
        >
      </div>
    </div>
  </form>
</template>

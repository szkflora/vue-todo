<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import { ref, defineEmits } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const keyword = ref<string>('');

const emit = defineEmits<{
  (e: 'search', keyword: string): void;
}>();

function handleSearch(): void {
  emit('search', keyword.value);
}
</script>

<template>
  <form @submit.prevent="handleSearch">
    <div class="w-[600px] h-[40px] flex justify-between items-center m-6 rounded-xl border-2 border-solid">
      <div class="flex gap-3">
        <MagnifyingGlassIcon class="w-6 pl-1"></MagnifyingGlassIcon>
        <input v-model="keyword" placeholder="Search todos..." />
      </div>
      <div class="flex items-center pr-1">
        <BaseButton
          html-type="submit"
          type="search"
          class="bg-[#000000] text-white flex items-center justify-center text-sm"
          >Search</BaseButton
        >
      </div>
    </div>
  </form>
</template>

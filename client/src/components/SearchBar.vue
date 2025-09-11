<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { watch, defineEmits, defineProps, ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  keyword?: string;
}>();

const localKeyword = ref(props.keyword ?? '');

let debounceId: number | null = null;

const emit = defineEmits<{
  (e: 'search', keyword: string): void;
}>();

const router = useRouter();
const route = useRoute();

function pushToUrlAndEmit(value: string) {
  emit('search', value);

  router
    .replace({
      path: route.path,
      query: {
        ...route.query,
        keyword: value || undefined,
      },
    })
    .catch(() => {});
}

watch(localKeyword, (val) => {
  if (debounceId != null) clearTimeout(debounceId);
  debounceId = window.setTimeout(() => {
    pushToUrlAndEmit(val.trim());
    debounceId = null;
  }, 1000);
});

function handleSearch() {
  if (debounceId != null) {
    clearTimeout(debounceId);
    debounceId = null;
  }
  pushToUrlAndEmit(localKeyword.value.trim());
}
</script>

<template>
  <form @submit.prevent="handleSearch" class="flex justify-center">
    <div class="w-full h-[40px] flex justify-between items-center my-3 md:my-5 rounded-xl border-2 border-solid">
      <div class="flex gap-3">
        <MagnifyingGlassIcon class="w-6 ml-1" />
        <input v-model="localKeyword" class="task_text md:w-[480px]" placeholder="Search todos..." />
      </div>
      <div class="flex items-center mr-1">
        <BaseButton html-type="submit" type="bar" class="bg-black text-white flex items-center justify-center text-sm"
          >Search</BaseButton
        >
      </div>
    </div>
  </form>
</template>

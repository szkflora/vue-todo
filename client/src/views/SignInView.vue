<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

const email = ref<string>('');
const password = ref<string>('');
</script>

<template>
  <form>
    <div class="bg-[#efefef] px-6 py-4 font-sans border-0 rounded-2xl text-lg">
      <BaseInput v-model="email" text="Email address:"/>
      <BaseInput v-model="password" type="password" text="Password:"/>
      <div class="flex justify-end mt-5">
        <BaseButton html-type="submit">Sign in</BaseButton>
      </div>
    </div>
  </form>
</template>
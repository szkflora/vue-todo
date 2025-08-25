<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
</script>

<template>
  <form>
    <div class="bg-[#efefef] px-6 py-4 font-sans border-0 rounded-2xl text-lg">
      <BaseInput v-model="firstName" text="First name: "></BaseInput>
      <BaseInput v-model="lastName" text="Last name: "></BaseInput>
      <BaseInput v-model="email" text="Email address: "></BaseInput>
      <BaseInput v-model="password" text="Password:"></BaseInput>
      <br />
      <div class="flex justify-end">
        <BaseButton html-type="submit">Sign up</BaseButton>
      </div>
    </div>
  </form>
</template>

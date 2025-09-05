<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const userData = ref({
  email: '',
  password: '',
});

async function signIn() {
  const res = await authStore.signIn(userData.value.email, userData.value.password)
  if (res === 200){
    window.location.href = '/tasks';
  }
}

async function signUp() {
  window.location.href = '/signup';
}

</script>

<template>
  <form @submit.prevent="signIn">
    <div class="w-[328px] md:w-[400px] font-sans border-0 text-lg">
      <p class="font-medium text-3xl text-[black] text-center pb-10">Sign in to your account</p>
      <BaseInput v-model="userData.email" text="Email address"/>
      <BaseInput v-model="userData.password" type="password" text="Password"/>
      <div class="flex justify-end">
        <BaseButton html-type="submit" type="auth">Sign in</BaseButton>
      </div>
      <p class="font-medium text-base text-[gray]">Don't have an account? <b class="font-medium text-base text-[#38cb89] hover:text-[#23a068] cursor-pointer" @click="signUp">Sign up</b></p>
    </div>
  </form>
</template>

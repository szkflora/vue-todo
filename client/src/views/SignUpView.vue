<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { ref } from 'vue';
import { User } from '../types/User';
import BaseButton from '../components/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const error = ref<Record<string, string[]>>({});
const status = ref<number>();

const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

async function signUp() {
  const submittedUser: User = {
    firstName: newUser.value.firstName,
    lastName: newUser.value.lastName,
    email: newUser.value.email,
    password: newUser.value.password,
  };
  const { status: serverStatus, error: serverErrors } = await authStore.signUp(submittedUser);

  status.value = serverStatus;
  error.value = serverErrors ?? {};

  if (serverStatus === 201) {
    window.location.href = '/tasks';
  }
}
</script>

<template>
  <form @submit.prevent="signUp">
    <div class="w-[328px] md:w-[400px] font-sans border-0 text-lg">
      <p class="font-medium text-3xl text-[black] text-center pb-10">Create an account</p>
      <BaseInput v-model="newUser.firstName" text="First name" :error="error.firstName?.[0]"/>
      <BaseInput v-model="newUser.lastName" text="Last name" :error="error.lastName?.[0]"/>
      <BaseInput v-model="newUser.email" text="Email address" :error="error.email?.[0]"/>
      <BaseInput v-model="newUser.password" type="password" :error="error.password?.[0]" text="Password" />
      <div class="flex justify-end mt-5">
        <BaseButton html-type="submit" type="auth">Sign up</BaseButton>
      </div>
    </div>
  </form>
</template>

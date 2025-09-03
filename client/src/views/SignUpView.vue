<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { reactive } from 'vue';
import { User } from '../types/User'
import BaseButton from '../components/BaseButton.vue';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();

const newUser = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

async function signUp() {
  const submittedUser: User = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
  };
  const res = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(submittedUser),
  });

  if (res.status === 201){
    const data = await res.json();
    console.log(data);
    localStorage.setItem('authToken', data.token);
    taskStore.getTasks();
    window.location.href = '/tasks';
  }
}
</script>

<template>
  <form @submit.prevent="signUp">
    <div class="bg-[#efefef] px-6 py-4 font-sans border-0 rounded-2xl text-lg">
      <BaseInput v-model="newUser.firstName" text="First name: "/>
      <BaseInput v-model="newUser.lastName" text="Last name: "/>
      <BaseInput v-model="newUser.email" text="Email address: "/>
      <BaseInput v-model="newUser.password" type="password" text="Password:"/>
      <div class="flex justify-end mt-5">
        <BaseButton html-type="submit">Sign up</BaseButton>
      </div>
    </div>
  </form>
</template>

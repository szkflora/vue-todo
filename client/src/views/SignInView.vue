<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { reactive } from 'vue';
import BaseButton from '../components/BaseButton.vue';

const userData = reactive({
  email: '',
  password: '',
});

async function signIn() {
  const res = await fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (res.status === 200){
    const data = await res.json();
    console.log(data);
    localStorage.setItem('authToken', data.token);
    
    window.location.href = '/tasks';
  }
}
</script>

<template>
  <form @submit.prevent="signIn">
    <div class="bg-[#efefef] px-6 py-4 font-sans border-0 rounded-2xl text-lg">
      <BaseInput v-model="userData.email" text="Email address:"/>
      <BaseInput v-model="userData.password" type="password" text="Password:"/>
      <div class="flex justify-end mt-5">
        <BaseButton html-type="submit">Sign in</BaseButton>
      </div>
    </div>
  </form>
</template>

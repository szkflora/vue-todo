<script setup lang="ts">
import { reactive } from 'vue';
import { User } from '../types/User'
import BaseButton from '../components/BaseButton.vue';

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
  await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(submittedUser),
  });
}
</script>

<template>
  <form @submit.prevent="signUp">
    <div class="bg-[#efefef] px-6 py-4 font-sans border-0 rounded-2xl text-lg">
      <div class="flex items-center">
        <label>First name: </label>
        <input v-model="newUser.firstName" /><br />
      </div>
      <div class="flex items-center">
        <label>Last name: </label>
        <input v-model="newUser.lastName" /><br />
      </div>
      <div class="flex items-center">
        <label>Email address: </label>
        <input v-model="newUser.email" /><br />
      </div>
      <div class="flex items-center">
        <label>Password: </label>
        <input type="password" v-model="newUser.password" /><br />
      </div>
      <br />
      <div class="flex justify-end">
        <BaseButton html-type="submit">Sign Up</BaseButton>
      </div>
    </div>
  </form>
</template>

<style scoped>
input {
  background-color: white;
  border: none;
  outline: none;
  padding-left: 4px;
  height: 26px;
  border-radius: 6px;
}
label {
  padding-right: 2px;
}
</style>

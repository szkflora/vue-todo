<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';

const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
</script>

<template>
  <form>
    <div class="bg-[#efefef] px-6 py-4 font-sans border-0 rounded-2xl text-lg">
      <div class="flex items-center">
        <label>First name: </label>
        <input v-model="firstName" /><br />
      </div>
      <div class="flex items-center">
        <label>Last name: </label>
        <input v-model="lastName" /><br />
      </div>
      <div class="flex items-center">
        <label>Email address: </label>
        <input v-model="email" /><br />
      </div>
      <div class="flex items-center">
        <label>Password: </label>
        <input type="password" v-model="password" /><br />
      </div>
      <br />
      <div class="flex justify-end">
        <BaseButton html-type="submit">Sign up</BaseButton>
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

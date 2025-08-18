<script setup lang="ts">
import { ref, defineProps } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  mode: string;
}>();

const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

</script>

<template>
    <form>
        <div>
            <div v-show="mode === 'signin'">
            <label>First name:</label>
            <input v-model="firstName"></input><br>
            <label>Last name:</label>
            <input v-model="lastName"></input><br>
            </div>
            <label>Email address:</label>
            <input v-model="email"></input><br>
            <label>Password:</label>
            <input v-model="password"></input><br>
            <br>
            <BaseButton v-if="mode === 'signin'" html-type="submit" type="primary">Sign in</BaseButton>
            <BaseButton v-else>Login</BaseButton>
        </div>
    </form>
</template>
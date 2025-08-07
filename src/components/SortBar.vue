<script setup lang="ts">
import BaseButton from './BaseButton.vue';
</script>

<template>
    <div class="w-[600px] flex justify-between">
        <div>
        <BaseButton>Title</BaseButton>
        <BaseButton>Description</BaseButton>
        <BaseButton>Priority</BaseButton>
        <BaseButton>Date</BaseButton>
        </div>
    </div>
</template>
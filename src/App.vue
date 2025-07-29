<script setup lang="ts">
import Header from '@/components/Header.vue'

const addSomething = (): void => {
  console.log('something was added');
}

</script>

<template>
  <header>
  <Header @addSmthToDo="addSomething"></Header>
  </header>

  <main>
  </main>
</template>

<style scoped>
</style>

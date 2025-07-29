<script setup lang="ts"></script>

<template>
    <div class="header">
      <h1 class="title">To do list</h1>
      <button type="button" class="plus-button">+</button>
    </div>
</template>

<style scoped>

.header {
  width: 500px;
  display: flex;
  justify-content: space-between;
}

.title {
  font-family: "Neue Haas Grotesk Display Pro";
  font-weight: 600;
  size: 72px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #000000;
}

.plus-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #38cb89;
  color: white;
  font-size: 29px;
  font-weight: thin;
  cursor: pointer;
}
</style>

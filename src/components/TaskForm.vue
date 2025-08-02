<script setup lang="ts">
import { ref, watch } from 'vue';
import { Task, Importance } from '../types/Task';

const title = ref<string>('');
const description = ref<string>('');
const descriptionRef = ref<HTMLTextAreaElement>(null); // referencia a DOM textarea elemre
const importance = ref<Importance>(Importance.HIGH);

let idCounter = 1;

const emit = defineEmits<{
  (e: 'taskCreated', task: Task): void;
}>();

// figyeli a 'description' valtozasat
watch(description, () => {
  resizeTextArea();
});

function resizeTextArea(): void {
  const desc = descriptionRef.value;
  if (desc) { // van description
    desc.style.height = '80px';

    if (description.value.trim() !== '') {
      desc.style.height = `${desc.scrollHeight}px`;
    }
  }
}

function createTask(): void {
  const newTask: Task = {
    id: idCounter++,
    title: title.value,
    description: description.value,
    importance: importance.value,
    completed: false,
  };

  emit('taskCreated', newTask);

  title.value = '';
  description.value = '';
  importance.value = Importance.HIGH;
  resizeTextArea();
}

</script>

<template>
  <form @submit.prevent="createTask">
    <div class="task h-auto">
      <div class="flex flex-col justify-between">
        <input v-model="title" placeholder="Title" required class="text-[#000000] text-[42px] task_text" />
        <textarea
          ref="descriptionRef"
          rows="3"
          v-model="description"
          placeholder="Description"
          class="text-[#757575] text-[28px] overflow-hidden resize-none task_text"
        ></textarea>
        <button type="submit" class="save">Save</button>
      </div>
      <div class="flex flex-col justify-between">
        <select v-model="importance" placeholder="Importance">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  </form>
</template>

<style scoped>
select,
option {
  width: 120px;
  height: 30px;
  border: 2px solid black;
  border-radius: 16px;
  letter-spacing: 0px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.save {
  background-color: #38cb89;
  color: white;
  width: 110px;
  height: 50px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 17px;
}
</style>

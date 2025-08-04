<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';
import { Task, Importance } from '../types/Task';

const props = defineProps<{
  initialTask: Task | null; // a form megjelenhet editeles miatt vagy uresen
}>();

const emit = defineEmits<{
  (e: 'taskSubmitted', data: { newTask: Task; mode: 'create' | 'edit' }): void;
  (e: 'confirmDeletion', task: Task): void;
}>();

const title = ref<string>('');
const description = ref<string>('');
const descriptionRef = ref<HTMLTextAreaElement>(null); // referencia a DOM textarea elemre
const importance = ref<Importance>(Importance.HIGH);
const editMode = ref<boolean>(false);

let idCounter = 1;
let taskId: number | null = null;

watch(
  () => props.initialTask, // initialTask valtozasat figyeli
  (newTask) => {
    if (newTask) {
      editMode.value = true;
      taskId = newTask.id;
      title.value = newTask.title;
      description.value = newTask.description;
      importance.value = newTask.importance;
    } else {
      editMode.value = false;
      taskId = null;
      title.value = '';
      description.value = '';
      importance.value = Importance.HIGH;
    }
    setTimeout(() => {
      resizeTextArea();
    }, 0);
  },
);

// figyeli a 'description' valtozasat
watch(description, () => {
  resizeTextArea();
});

function resizeTextArea(): void {
  const desc = descriptionRef.value;
  if (desc) {
    desc.style.height = '80px';

    if (description.value.trim() !== '') {
      desc.style.height = `${desc.scrollHeight}px`;
    }
  }
}

function handleSubmit(): void {
  const submittedTask: Task = {
    id: editMode.value ? taskId : idCounter++,
    title: title.value,
    description: description.value,
    importance: importance.value,
    completed: false,
  };

  if (editMode.value) {
    emit('taskSubmitted', { newTask: submittedTask, mode: 'edit' });
  } else {
    emit('taskSubmitted', { newTask: submittedTask, mode: 'create' });
  }

  title.value = '';
  description.value = '';
  importance.value = Importance.HIGH;
  editMode.value = false;
  taskId = null;
  resizeTextArea();
}

function deleteTask(): void {
  emit('confirmDeletion', props.initialTask);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="task">
      <div class="flex justify-between gap-16">
        <input v-model="title" placeholder="Title" required class="text-[#000000] text-[42px] max-w-xs task_text" />
        <select v-model="importance" placeholder="Importance">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <textarea
          ref="descriptionRef"
          rows="3"
          v-model="description"
          placeholder="Description"
          class="text-[#757575] text-[28px] overflow-hidden resize-none task_text"
        ></textarea>
        <div class="flex gap-3">
          <button type="submit" class="save mr-[20px]">Save</button>
          <button type="button" class="delete" @click="deleteTask">Delete</button>
        </div>
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

.delete {
  background-color: #e6e6e6;
  color: #000000;
  width: 110px;
  height: 50px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 17px;
}
</style>

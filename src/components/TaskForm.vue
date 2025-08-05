<script setup lang="ts">
import { ref, reactive, computed, defineEmits, defineModel } from 'vue';
import { Task, Importance } from '../types/Task';

const props = defineProps<{
  idCounter: number;
}>();

const modelValue = defineModel<Task | null>();

const emit = defineEmits<{
  (e: 'taskSubmitted', data: { newTask: Task; mode: 'create' | 'edit' }): void;
  (e: 'confirmDeletion', task: Task): void;
}>();

const descriptionRef = ref<HTMLTextAreaElement>(null); // referencia a DOM textarea elemre

const formData = reactive({
  id: 0,
  title: '',
  description: '',
  importance: Importance.HIGH,
});

const editMode = computed(() => modelValue.value !== null);

if (editMode.value && modelValue.value) {
  formData.id = modelValue.value.id;
  formData.title = modelValue.value.title;
  formData.description = modelValue.value.description;
  formData.importance = modelValue.value.importance;
}

function resizeTextArea(): void {
  const desc = descriptionRef.value;
  if (desc) {
    desc.style.height = '80px';

    if (formData.description.trim() !== '') {
      desc.style.height = `${desc.scrollHeight}px`;
    }
  }
}

function handleSubmit(): void {
  const submittedTask: Task = {
    id: editMode.value ? formData.id : props.idCounter,
    title: formData.title,
    description: formData.description,
    importance: formData.importance,
    completed: false,
  };

  if (editMode.value) {
    emit('taskSubmitted', { newTask: submittedTask, mode: 'edit' });
  } else {
    emit('taskSubmitted', { newTask: submittedTask, mode: 'create' });
  }
}

function deleteTask(): void {
  emit('confirmDeletion', modelValue.value);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="task">
      <div class="flex justify-between gap-16">
        <input v-model="formData.title" placeholder="Title" required class="text-[#000000] text-[42px] max-w-xs task_text" />
        <select v-model="formData.importance" placeholder="Importance">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <textarea
          ref="descriptionRef"
          rows="3"
          @input="resizeTextArea"
          v-model="formData.description"
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
  font-size: 18px;
  font-weight: 600;
}

.delete {
  background-color: #e6e6e6;
  color: #000000;
  width: 110px;
  height: 50px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}

.delete:hover {
  background-color: #b1b1b1;
}

.save:hover {
  background-color: #23a068;
}
</style>

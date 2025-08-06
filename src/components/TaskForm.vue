<script setup lang="ts">
import { ref, reactive, computed, defineEmits, defineModel, watch, nextTick } from 'vue';
import { Task, Importance } from '../types/Task';

const modelValue = defineModel<Task | null>();

const emit = defineEmits<{
  (e: 'taskSubmitted', task: Task): void;
  (e: 'confirmDeletion', task: Task): void;
}>();

const descriptionRef = ref<HTMLTextAreaElement>(null); // referencia a DOM textarea elemre

const formData = reactive({
  id: 0,
  title: '',
  description: '',
  importance: Importance.HIGH,
  completed: false
});

const editMode = computed(() => modelValue.value !== null);

function populateFormFromModel(task: Task): void {
  formData.id = task.id;
  formData.title = task.title;
  formData.description = task.description;
  formData.importance = task.importance;
  formData.completed = task.completed;
}

watch(
  modelValue,
  async (task) => {
    if (task) {
      populateFormFromModel(task);
      await nextTick();
      resizeTextArea();
    }
  },
  { immediate: true },
);

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
    id: editMode.value ? formData.id : 0,
    title: formData.title,
    description: formData.description,
    importance: formData.importance,
    completed: formData.completed,
  };

  if (editMode.value) {
    emit('taskSubmitted', submittedTask);
  } else {
    emit('taskSubmitted', submittedTask);
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
        <input
          v-model="formData.title"
          placeholder="Title"
          required
          class="text-[#000000] text-[42px] max-w-xs task_text"
        />
        <select
          v-model="formData.importance"
          placeholder="Importance"
          class="font-sans w-[120px] h-[30px] tracking-[0px] text-center rounded-2xl border-2 border-solid border-[black]"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <textarea
          ref="descriptionRef"
          @input="resizeTextArea"
          v-model="formData.description"
          placeholder="Description"
          class="text-[#757575] text-[28px] overflow-hidden resize-none task_text"
        ></textarea>
        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-[#38cb89] text-[white] rounded-2xl w-[110px] h-[50px] text-lg border-[none] mr-[20px] hover:bg-[#23a068]"
          >
            Save
          </button>
          <button
            type="button"
            class="bg-[#e6e6e6] text-black rounded-2xl w-[110px] h-[50px] text-lg border-[none] hover:bg-[#b1b1b1]"
            @click="deleteTask"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineEmits, defineProps, watch, nextTick } from 'vue';
import { Task, Importance } from '../types/Task';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  modelValue: Task | null;
}>();

const emit = defineEmits<{
  (e: 'taskSubmitted', task: Task): void;
  (e: 'confirmDeletion', task: Task): void;
}>();

const descriptionRef = ref<HTMLTextAreaElement>(null);

const formData = reactive({
  id: 0,
  title: '',
  description: '',
  importance: Importance.HIGH,
  date: null,
  completed: false,
});

const editMode = computed(() => props.modelValue !== null);

function populateFormFromModel(task: Task): void {
  formData.id = task.id;
  formData.title = task.title;
  formData.description = task.description;
  formData.importance = task.importance;
  formData.completed = task.completed;
}

watch(
  () => props.modelValue,
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
    date: new Date(),
    completed: formData.completed,
  };

  emit('taskSubmitted', submittedTask);
}

function deleteTask(): void {
  emit('confirmDeletion', props.modelValue);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="task px-4 w-[348px] md:w-[600px]">
      <div class="flex justify-between md:gap-16">
        <input
          v-model="formData.title"
          placeholder="Title"
          required
          class="text-[#000000] text-[28px] md:text-[42px] w-full task_text"
        />
        <select
          v-model="formData.importance"
          placeholder="Importance"
          class="font-sans w-[80px] md:w-[120px] h-[20px] md:h-[30px] tracking-[0px] text-center rounded-2xl border-2 border-solid border-[black]"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="flex flex-col justify-between md:gap-4">
        <textarea
          ref="descriptionRef"
          @input="resizeTextArea"
          v-model="formData.description"
          placeholder="Description"
          class="text-[#757575] text-[20px] md:text-[28px] overflow-hidden resize-none task_text w-full"
        ></textarea>
        <div class="flex md:gap-3">
          <BaseButton html-type="submit" type="primary" class="bg-[#38cb89] text-[white] mr-[20px] hover:bg-[#23a068]">
            Save
          </BaseButton>
          <BaseButton
            html-type="button"
            type="primary"
            class="bg-[#e6e6e6] text-black hover:bg-[#b1b1b1]"
            @click="deleteTask"
          >
            Delete
          </BaseButton>
        </div>
      </div>
    </div>
  </form>
</template>

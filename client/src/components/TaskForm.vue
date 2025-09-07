<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, watch, nextTick } from 'vue';
import { Task, Importance } from '@/types/Task';
import BaseButton from '@/components/BaseButton.vue';
import { CalendarDaysIcon } from '@heroicons/vue/24/outline';
import DatePicker from 'primevue/datepicker';

const props = defineProps<{
  modelValue: Task | null;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'taskSubmitted', task: Task): void;
  (e: 'confirmDeletion', task: Task): void;
}>();

const descriptionRef = ref<HTMLTextAreaElement>(null);
const selectedImportance = ref<Importance>(null);

const formData = ref({
  id: null,
  title: '',
  description: '',
  importance: Importance.HIGH,
  dueDate: new Date(),
  creationDate: new Date(),
  completed: false,
});

const editMode = computed(() => props.modelValue !== null);

function populateFormFromModel(task: Task): void {
  formData.value.id = task._id;
  formData.value.title = task.title;
  formData.value.description = task.description;
  formData.value.importance = task.importance;
  formData.value.completed = task.completed;
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
    const isMd = window.innerWidth >= 768;
    desc.style.height = isMd ? '60px' : '40px';

    if (formData.value.description.trim() !== '') {
      desc.style.height = `${desc.scrollHeight}px`;
    }
  }
}

function handleSubmit(): void {
  const submittedTask: Task = {
    _id: editMode.value ? formData.value.id : null,
    title: formData.value.title,
    description: formData.value.description,
    importance: formData.value.importance,
    dueDate: formData.value.dueDate,
    creationDate: formData.value.creationDate,
    completed: formData.value.completed,
  };
  emit('taskSubmitted', submittedTask);
}

function deleteTask(): void {
  emit('confirmDeletion', props.modelValue);
}

function setImportance(importance: Importance): void {
  formData.value.importance = importance;
  selectedImportance.value = importance;
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="task flex-col w-full">
      <div class="flex justify-between md:gap-26 mb-2 md:mb-4">
        <input
          v-model="formData.title"
          placeholder="Title"
          required
          class="text-black text-[28px] md:text-[42px] w-[160px] md:w-[340px] task_text"
        />
        <div class="hidden md:flex">
          <select
            v-model="formData.importance"
            placeholder="Importance"
            class="font-sans w-[80px] md:w-[120px] h-[20px] md:h-[30px] tracking-[0px] text-center rounded-2xl border-2 border-solid border-black"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div class="flex md:hidden justify-between items-center gap-1">
          <BaseButton
            type="default"
            :class="['w-4 h-4 bg-[#38cbcb]', selectedImportance === Importance.LOW ? 'border-2 border-black' : '']"
            @click="setImportance(Importance.LOW)"
          />
          <BaseButton
            type="default"
            :class="['w-4 h-4 bg-[#ffab00]', selectedImportance === Importance.MEDIUM ? 'border-2 border-black' : '']"
            @click="setImportance(Importance.MEDIUM)"
          />
          <BaseButton
            type="default"
            :class="['w-4 h-4 bg-[#ff481f]', selectedImportance === Importance.HIGH ? 'border-2 border-black' : '']"
            @click="setImportance(Importance.HIGH)"
          />
        </div>
      </div>
      <div class="flex flex-col justify-between gap-2 md:gap-4">
        <textarea
          ref="descriptionRef"
          @input="resizeTextArea"
          v-model="formData.description"
          placeholder="Description"
          class="text-[#757575] text-[20px] md:text-[28px] overflow-hidden resize-none task_text w-full"
        ></textarea>
        <div class="flex justify-between gap-3">
          <div class="flex md:gap-3">
            <BaseButton html-type="submit" class="text-white"> Save </BaseButton>
            <BaseButton class="bg-[#e6e6e6] text-black hover:bg-[#b1b1b1]" @click="deleteTask"> Delete </BaseButton>
          </div>
          <div class="flex">
            <CalendarDaysIcon class="hidden md:flex w-4" />
            <DatePicker v-model="formData.dueDate" class="w-[106px]" />
          </div>
        </div>
      </div>
    </div>
    <p v-if="error" class="text-[red] text-xl font-medium">{{ error }}</p>
  </form>
</template>

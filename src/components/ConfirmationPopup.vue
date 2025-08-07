<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';
import BaseButton from './BaseButton.vue';

const dialogRef = ref<HTMLDialogElement | null>(null);

// const props = defineProps<{
//   isOpen: boolean;
// }>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'delete'): void;
}>();

function handelCancel() {
  emit('cancel');
}

function handelDelete() {
  emit('delete');
}

dialogRef.value?.showModal();
// watch(
//   () => props.isOpen,
//   (newVal) => {
//     if (newVal) {
//       dialogRef.value?.showModal();
//     } else {
//       dialogRef.value?.close();
//     }
//   },
// );
</script>

<template>
  <dialog
    ref="dialogRef"
    id="confirmation-dialog"
    aria-labelledby="dialog-title"
    class="m-auto fixed inset-0 flex items-center justify-center bg-white w-[600px] p-4 rounded-2xl border-2 border-solid border-[#ccc]"
    @click.self="handelCancel"
  >
    <div class="flex flex-col gap-[30px]">
      <div class="flex justify-center items-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          data-slot="icon"
          aria-hidden="true"
          class="w-10 h-10 text-red-600"
        >
          <path
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 id="dialog-title" class="font-semibold text-2xl leading-[100%] text-center mb-2">Delete task</h3>
        <p class="font-normal text-xl text-gray-500 text-center">
          Are you sure you want to delete this task? <br />This action cannot be undone.
        </p>
      </div>
      <div class="flex justify-end gap-3">
        <BaseButton
          html-type="button"
          type="secondary"
          @click="handelDelete"
          class="bg-red-600 text-[white] hover:bg-red-700"
        >
          Delete
        </BaseButton>
        <BaseButton
          html-type="button"
          type="secondary"
          @click="handelCancel"
          class="bg-[rgb(188,182,182)] text-gray-900 hover:bg-[#8e8989]"
        >
          Cancel
        </BaseButton>
      </div>
    </div>
  </dialog>
</template>

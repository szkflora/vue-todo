<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dialogRef = ref<HTMLDialogElement | null>(null);

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'delete'): void;
}>();

const closeNativeDialog = () => {
  if (dialogRef.value && dialogRef.value.open) {
    dialogRef.value.close();
  }
};

function handelCancel() {
  closeNativeDialog();
  emit('cancel');
}

function handelDelete() {
  closeNativeDialog();
  emit('delete');
}

onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.showModal();
  }
});

onBeforeUnmount(() => {
  if (dialogRef.value) {
    if (dialogRef.value.open) {
      dialogRef.value.close();
    }
  }
});

</script>

<template>
  <dialog
    ref="dialogRef"
    id="confirmation-dialog"
    aria-labelledby="dialog-title"
    class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent"
    @click.self="handelCancel"
  >
    <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>

    <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-red-600">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 id="dialog-title" class="text-base font-semibold text-gray-900">Delete task</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Are you sure you want to delete this task? This action cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" @click="handelDelete" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
          <button type="button" @click="handelCancel" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: rgba(75, 85, 99, 0.75);
  transition: opacity 300ms ease-out;
}

.fixed.inset-0.bg-gray-500\/75 {
  z-index: -1;
}
</style>
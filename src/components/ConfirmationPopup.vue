<script setup lang="ts">
import { defineEmits } from 'vue';
import { Dialog, TransitionRoot, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'delete'): void;
}>();

function handleCancel() {
  emit('cancel');
}

function handleDelete() {
  emit('delete');
}
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="handleCancel">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <div class="flex justify-center items-center mb-4">
              <ExclamationTriangleIcon class="h-10 w-10 text-red-600" aria-hidden="true" />
            </div>

            <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900 text-center">
              Delete task
            </DialogTitle>
            <p class="mt-2 text-center text-lg text-gray-500">
              Are you sure you want to delete this task?<br />This action cannot be undone.
            </p>

            <div class="mt-6 flex justify-end gap-3">
              <BaseButton
                html-type="button"
                type="secondary"
                @click="handleCancel"
                class="flex justify-center items-center bg-[rgb(188,182,182)] text-gray-900 hover:bg-[#8e8989]"
              >
                Cancel
              </BaseButton>
              <BaseButton
                html-type="button"
                type="secondary"
                @click="handleDelete"
                class="flex justify-center items-center bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </BaseButton>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

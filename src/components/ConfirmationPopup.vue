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
    class="dialog-base"
    @click.self="handelCancel"
  >
    <div class="dialog-content">
      <div class="dialog-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="icon">
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="dialog-text">
        <h3 id="dialog-title" class="dialog-title">Delete task</h3>
        <p class="dialog-message">Are you sure you want to delete this task? <br/>This action cannot be undone.</p>
      </div>
      <div class="dialog-buttons">
        <button type="button" @click="handelDelete" class="delete-button">Delete</button>
        <button type="button" @click="handelCancel" class="cancel-button">Cancel</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.dialog-base {
  width: 600px;
  padding: 16px;
  border: 2px solid #ccc;
  border-radius: 16px;
  background: white;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.dialog-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 40px;
  height: 40px;
  color: #dc2626;
}

.dialog-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  margin-bottom: 8px;
  text-align: center;
}

.dialog-message {
  font-weight: 400;
  font-size: 20px;
  color: #6b7280; 
  text-align: center;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.delete-button {
  background-color: #dc2626;
  color: white;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #b91c1c;
}

.cancel-button {
  background-color: rgb(188, 182, 182);
  color: #111827;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #8e8989;
}
</style>

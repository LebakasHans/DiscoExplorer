<script setup lang="ts">
import type { ToastModel } from '~/models/toastModel';

const toasts = ref<ToastWithId[]>([]);

function addToast(toastModel: ToastModel) {
  const id = Date.now();
  const newToast: ToastWithId = { ...toastModel, id };
  toasts.value.push(newToast);

  setTimeout(() => {
    removeToast(id);
  }, toastModel.duration || 3000);
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter(t => t.id !== id);
}

defineExpose({
  addToast,
});

interface ToastWithId extends ToastModel {
  id: number;
}
</script>

<template>
  <TransitionGroup name="toast-list" tag="div" class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast-item" :class="`toast-${toast.severity || 'info'}`">
      {{ toast.message }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1rem;
  left: 50%; /* Position from the left edge */
  transform: translateX(-50%); /* Center horizontally */
  display: flex;
  flex-direction: column;
  align-items: center; /* Align toast items to the center if container width is larger */
  gap: 0.5rem;
  z-index: 1000; /* Ensure toasts are on top */
}

.toast-item {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  opacity: 0.9;
  width: auto; /* Or a specific max-width if you prefer */
  min-width: 200px; /* Example min-width */
  text-align: center;
}

/* TransitionGroup classes */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.5s ease;
}
.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}
.toast-list-enter-to,
.toast-list-leave-from {
  opacity: 0.9;
  transform: translateY(0) scale(1);
}

/* Ensure smooth movement of other items when one is removed/added */
.toast-list-move {
  transition: transform 0.5s ease;
}

.toast-info {
  background-color: #3b82f6;
}

.toast-success {
  background-color: #22c55e;
}

.toast-warning {
  background-color: #f97316;
}

.toast-error {
  background-color: #ef4444;
}
</style>

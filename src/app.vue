<script setup lang="ts">
import type { ToastModel } from './models/toastModel';
import Toast from '~/components/shared/Toast.vue';
import { useToastService } from '~/composables/useToastService';

interface ToastComponentExposed {
  addToast: (toastModel: ToastModel) => void;
}

const toast = ref<ToastComponentExposed | null>();
const { setToastFn } = useToastService();

onMounted(() => {
  if (toast.value) {
    setToastFn(toast.value.addToast);
  }
});
</script>

<template>
  <div class="relative min-h-screen">
    <div class="absolute top-4 right-4">
      <ColorModeSwitch />
    </div>
    <div class="flex items-center justify-center h-screen">
      <Explorer />
    </div>
    <Toast ref="toast" />
  </div>
</template>

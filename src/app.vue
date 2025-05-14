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
    <NuxtLayout>
      <div class="flex items-center justify-center h-screen w-screen">
        <NuxtPage />
      </div>
    </NuxtLayout>
    <Toast ref="toast" />
  </div>
</template>

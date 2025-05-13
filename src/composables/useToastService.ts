import type { ToastModel } from '~/models/toastModel';
import { ref } from 'vue';

type AddToastFn = (toastModel: ToastModel) => void;

const addToastRef = ref<AddToastFn | null>(null);

export function useToastService() {
  const setToastFn = (fn: AddToastFn) => {
    addToastRef.value = fn;
  };

  const showToast = (toastModel: ToastModel) => {
    if (addToastRef.value) {
      addToastRef.value(toastModel);
    }
    else {
      console.warn('Toast component reference not set yet.');
    }
  };

  return {
    setToastFn,
    showToast,
  };
}

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { createFolder } from '~/services/api';
import { currentFolderId } from '~/stores/folder';

const emit = defineEmits<{
  (e: 'folderCreated'): void;
}>();

const isShown = defineModel<boolean>('isShown', { required: true });
const folderName = ref('');
const errorText = ref('');
const isLoading = ref(false);

function closeDialog() {
  folderName.value = '';
  errorText.value = '';
  isShown.value = false;
}

async function addFolder() {
  if (!folderName.value.trim() || isLoading.value)
    return;

  isLoading.value = true;
  const result = await createFolder({
    name: folderName.value,
    parentId: currentFolderId.value!,
  });
  isLoading.value = false;

  if (result.isOk()) {
    emit('folderCreated');
    closeDialog();
  }
  else {
    errorText.value = result.error.message;
  }
}
</script>

<template>
  <div v-if="isShown" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center relative min-w-[300px]">
      <!-- Close Button -->
      <button
        class="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50"
        aria-label="Close"
        :disabled="isLoading"
        @click="closeDialog"
      >
        <XMarkIcon class="size-6" />
      </button>

      <div v-if="isLoading" class="flex justify-center items-center h-24">
        <LoadingSpinner />
      </div>
      <div v-else>
        <div class="mt-4">
          <label for="folderName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">Folder Name</label>
          <input
            id="folderName"
            v-model="folderName"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Enter folder name"
            :disabled="isLoading"
            @keyup.enter="addFolder"
          >
          <p v-if="errorText" class="mt-2 text-sm text-red-600 dark:text-red-400 text-left">
            {{ errorText }}
          </p>
        </div>

        <!-- OK Button -->
        <div class="mt-5 sm:mt-6">
          <button
            type="button"
            :disabled="!folderName.trim() || isLoading"
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            @click="addFolder"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Result } from 'neverthrow';
import type { SimpleResponse } from '~/models/simpleResponse';
import { uploadFile } from '~/services/api';
import { currentFolderId } from '~/stores/folder';

const props = defineProps<{
  files: File[];
}>();
const emit = defineEmits<{
  (e: 'uploadComplete', results: PromiseSettledResult<Result<SimpleResponse, SimpleResponse>>[]): void;
}>();

const uploading = ref(false);

async function handleUpload() {
  if (currentFolderId.value == null || uploading.value || !props.files || props.files.length === 0)
    return;

  uploading.value = true;

  const results = await Promise.allSettled(
    props.files.map(file => uploadFile(currentFolderId.value!, file)),
  );

  uploading.value = false;
  emit('uploadComplete', results);
}

function formatSize(size: number): string {
  if (size === undefined || size === null)
    return '';

  if (size < 1024)
    return `${size} B`;
  if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-70 flex justify-center items-end z-50">
    <div class="bg-white dark:bg-gray-800 p-5 rounded-t-lg shadow-lg min-w-[400px] max-w-lg text-gray-900 dark:text-gray-100">
      <h2 class="text-lg font-semibold mb-4">
        Upload Files
      </h2>

      <!-- Loading Indicator -->
      <div v-if="uploading" class="flex flex-col items-center justify-center p-4">
        <LoadingSpinner class="h-8 w-8" />
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Uploading files...
        </p>
      </div>

      <!-- File List and Upload Button -->
      <div v-else>
        <div v-if="files && files.length > 0" class="mb-4 max-h-40 overflow-y-auto">
          <ul class="list-disc list-inside space-y-1">
            <li v-for="file in files" :key="file.name" class="text-sm truncate">
              {{ file.name }} ({{ formatSize(file.size) }})
            </li>
          </ul>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            :disabled="!files || files.length === 0"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleUpload"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

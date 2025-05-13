<script setup lang="ts">
import type { SimpleFolderDto } from '~/models/simpleFolderDto';

defineProps<{
  path: SimpleFolderDto[];
}>();

const emit = defineEmits<{ (e: 'navigate', folderId: string): void }>();

function navigateToFolder(folderId: string) {
  emit('navigate', folderId);
}
</script>

<template>
  <div class="flex min-h-6 rounded-lg border p-2">
    <div v-for="(folder, index) in path" :key="index" class="flex items-center">
      /
      <span
        class="cursor-pointer text-sm text-gray-700 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
        @click="navigateToFolder(folder.folderId)"
      >
        {{ folder.name }}
      </span>
    </div>
  </div>
</template>

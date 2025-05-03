<script setup lang="ts">
import type { FolderStructureDto } from '~/models/folderStructure';
import { getFolderStructure, getRootFolderStructure } from '~/services/api';
import { currentFolderId } from '~/stores/folder';
import LoadingSpinner from '../shared/LoadingSpinner.vue';

const folderStructure = ref<FolderStructureDto>();
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  const result = currentFolderId.value === null
    ? await getRootFolderStructure()
    : await getFolderStructure(currentFolderId.value);

  if (result.isOk()) {
    folderStructure.value = result.value;
  }
  else {
    console.error('Failed to fetch root folder structure:', result.error);
  }

  isLoading.value = false;
});
</script>

<template>
  <div class="flex flex-col border p-3 rounded-lg shadow-lg w-4/5 h-4/5 space-y-3 overflow-auto">
    <ToolBar />
    <hr>
    <LoadingSpinner
      v-if="isLoading"
      class="flex justify-center items-center h-full"
    />
    <ExplorerContent
      v-else-if="folderStructure"
      :folder-structure="folderStructure"
    />
    <ExplorerErrorView
      v-else
      message="Failed to load folder structure."
    />
  </div>
</template>

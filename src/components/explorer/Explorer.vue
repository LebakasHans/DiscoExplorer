<script setup lang="ts">
import { currentFolderId } from '~/stores/folder';

const isNavigatingViaHistory = ref(false);
const filesToUpload = ref<File[]>([]);

const { folderStructure, isLoading, updateFolderStructure } = useFolderStructure();

watch(currentFolderId, (newId, oldId) => {
  if (isNavigatingViaHistory.value) {
    updateFolderStructure(newId);
    return;
  }

  updateFolderStructure(newId);

  if (newId !== oldId) {
    if (oldId === undefined) {
      history.replaceState({ folderId: newId }, '');
    }
    else {
      history.pushState({ folderId: newId }, '');
    }
  }
}, { immediate: false });

function goToParentFolder() {
  if (folderStructure.value?.parentFolderId !== undefined) {
    currentFolderId.value = folderStructure.value.parentFolderId;
  }
  else if (currentFolderId.value !== null) {
    currentFolderId.value = null;
  }
}

function handlePopState(_event: PopStateEvent) {
  isNavigatingViaHistory.value = true;
  goToParentFolder();
  nextTick(() => {
    isNavigatingViaHistory.value = false;
  });
}

function handleFilesDropped(files: File[]) {
  filesToUpload.value = files;
}

function handleUploadComplete() {
  filesToUpload.value = [];
  updateFolderStructure();
}

onMounted(async () => {
  await updateFolderStructure();
  history.replaceState({ folderId: currentFolderId.value }, '');
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <DropZone @files-dropped="handleFilesDropped" />
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
  <UploadFilesDialog
    v-if="filesToUpload.length > 0"
    :files="filesToUpload"
    @upload-complete="handleUploadComplete"
  />
</template>

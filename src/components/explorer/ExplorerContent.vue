<script setup lang="ts">
import type { ExplorerEntry } from '~/models/explorerEntry';
import type { FolderStructureDto } from '~/models/folderStructure';
import { deleteFile, deleteFolder, getFile } from '~/services/api';
import { currentFolderId } from '~/stores/folder';

defineProps<{
  folderStructure: FolderStructureDto;
}>();

const { updateFolderStructure } = useFolderStructure();
const isDownloading = ref(false);
const downloadingFileName = ref<string | null>(null);

const { showToast } = useToastService();

async function downloadFile(entry: ExplorerEntry) {
  isDownloading.value = true;
  downloadingFileName.value = entry.name;

  try {
    const result = await getFile(entry.id);
    if (result.isOk()) {
      const blob = new Blob([result.value]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = entry.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    else {
      console.error('Failed to download file:', result.error);
    }
  }
  catch (error) {
    console.error('Error during file download:', error);
  }
  finally {
    isDownloading.value = false;
    downloadingFileName.value = null;
  }
}

function navigateFolder(entry: ExplorerEntry) {
  currentFolderId.value = entry.id;
}

async function handleDeleteFile(entry: ExplorerEntry) {
  const result = await deleteFile(entry.id);

  if (result.isOk()) {
    showToast({
      message: `${entry.name} deleted successfully`,
      severity: 'success',
    });
  }
  else {
    showToast({
      message: result.error.message,
      severity: 'error',
    }); ;
  }

  await updateFolderStructure();
}

async function handleDeleteFolder(entry: ExplorerEntry) {
  const result = await deleteFolder(entry.id, false);

  if (result.isOk()) {
    showToast({
      message: `${entry.name} deleted successfully`,
      severity: 'success',
    });
  }
  else {
    showToast({
      message: result.error.message,
      severity: 'error',
    }); ;
  }

  await updateFolderStructure();
}
</script>

<template>
  <div class="flex w-full h-full">
    <div class="w-1/5">
      tmp
    </div>
    <div class="w-4/5">
      <div class="min-h-6 rounded-lg border p-2">
        {{ folderStructure.path }}
      </div>

      <div v-if="isDownloading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <LoadingSpinner />
          <p class="mt-3">
            Downloading {{ downloadingFileName }}
          </p>
        </div>
      </div>

      <EntryTable
        :folder-structure="folderStructure"
        @dblclick="(entry: ExplorerEntry) => {
          entry.isFile
            ? downloadFile(entry)
            : navigateFolder(entry);
        }"
        @delete="(entry: ExplorerEntry) => {
          entry.isFile
            ? handleDeleteFile(entry)
            : handleDeleteFolder(entry);
        }"
      />
    </div>
  </div>
</template>

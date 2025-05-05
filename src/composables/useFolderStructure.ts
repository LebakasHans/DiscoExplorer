import type { FolderStructureDto } from '~/models/folderStructure';
import { ref } from 'vue';
import { getFolderStructure, getRootFolderStructure } from '~/services/api';
import { currentFolderId } from '~/stores/folder';

const folderStructure = ref<FolderStructureDto>();
const isLoading = ref(true);

export function useFolderStructure() {
  async function updateFolderStructure(folderId: string | null = currentFolderId.value) {
    isLoading.value = true;
    const result = folderId === null
      ? await getRootFolderStructure()
      : await getFolderStructure(folderId);

    if (result.isOk()) {
      folderStructure.value = result.value;
      currentFolderId.value = result.value.folderId;
    }
    else {
      console.error('Failed to fetch folder structure:', result.error);
      folderStructure.value = undefined;
    }

    isLoading.value = false;
  }

  return {
    folderStructure,
    isLoading,
    updateFolderStructure,
  };
}

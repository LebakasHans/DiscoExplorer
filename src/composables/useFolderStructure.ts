import type { FolderStructureDto } from '~/models/folderStructure';
import { ref } from 'vue';
import { useFolderService } from '~/services/folderApi';
import { currentFolderId } from '~/stores/folder';

const folderStructure = ref<FolderStructureDto>();
const isLoading = ref(true);

export function useFolderStructure() {
  async function updateFolderStructure(folderId: string | null = currentFolderId.value, showToastOnError: boolean = true) {
    isLoading.value = true;
    const result = folderId === null
      ? await useFolderService().getRootFolderStructure()
      : await useFolderService().getFolderStructure(folderId);

    if (result.isOk()) {
      folderStructure.value = result.value;
      currentFolderId.value = result.value.folderId;
    }
    else {
      console.error('Failed to fetch folder structure:', result.error);
      folderStructure.value = undefined;
      if (showToastOnError) {
        useToastService().showToast({
          message: result.error.message || 'Failed to fetch folder structure',
          severity: 'error',
        });
      }
    }

    isLoading.value = false;
  }

  return {
    folderStructure,
    isLoading,
    updateFolderStructure,
  };
}

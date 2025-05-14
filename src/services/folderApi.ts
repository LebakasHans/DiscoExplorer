import type { ResultAsync } from 'neverthrow';
import type { CreateFolderDto } from '~/models/folderDto';
import type { FolderStructureDto } from '~/models/folderStructure';
import type { SimpleResponse } from '~/models/simpleResponse';
import { safeFetch } from './api';

export function useFolderService() {
  const getFolderStructure = (folderId: string): ResultAsync<FolderStructureDto, SimpleResponse> => {
    return safeFetch<FolderStructureDto>(`/folder/${folderId}/structure`, undefined, 'Failed to fetch folder structure');
  };

  const getRootFolderStructure = (): ResultAsync<FolderStructureDto, SimpleResponse> => {
    return safeFetch<FolderStructureDto>('/folder/root/structure', undefined, 'Failed to fetch root folder structure');
  };

  const createFolder = (folderDto: CreateFolderDto): ResultAsync<SimpleResponse, SimpleResponse> => {
    return safeFetch<SimpleResponse>(
      '/folder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(folderDto),
      },
      'Failed to create folder',
    );
  };

  const deleteFolder = (folderId: string, recursive: boolean = false): ResultAsync<SimpleResponse, SimpleResponse> => {
    return safeFetch<SimpleResponse>(
      `/folder/${folderId}?recursive=${recursive}`,
      {
        method: 'DELETE',
      },
      'Failed to delete folder',
    );
  };

  return { getFolderStructure, getRootFolderStructure, createFolder, deleteFolder };
}

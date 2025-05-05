import type { CreateFolderDto } from '../models/folderDto';
import type { FolderStructureDto } from '../models/folderStructure';
import type { SimpleResponse } from '../models/simpleResponse';
import { ResultAsync } from 'neverthrow';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}, ${response.statusText}`;
    try {
      const errorData: SimpleResponse = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    }
    catch (e) {
      console.warn('Could not parse error response body:', e);
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json() as T;
  }

  const text = await response.text();
  return { message: text || 'Operation successful' } as unknown as T;
}

function safeFetch<T>(
  path: string,
  options?: RequestInit,
  errorMessage: string = 'Failed to fetch data',
): ResultAsync<T, SimpleResponse> {
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.BASE_URL;
  const url = `${API_BASE_URL}${path}`;

  return ResultAsync.fromPromise(
    fetch(url, options).then(handleResponse<T>),
    (error) => {
      if (error instanceof Error && error.message) {
        return { message: error.message };
      }
      return { message: errorMessage };
    },
  );
}

export function getFolderStructure(folderId: string): ResultAsync<FolderStructureDto, SimpleResponse> {
  return safeFetch<FolderStructureDto>(`/folder/${folderId}/structure`, undefined, 'Failed to fetch folder structure');
}

export function getRootFolderStructure(): ResultAsync<FolderStructureDto, SimpleResponse> {
  return safeFetch<FolderStructureDto>('/folder/root/structure', undefined, 'Failed to fetch root folder structure');
}

export function createFolder(folderDto: CreateFolderDto): ResultAsync<SimpleResponse, SimpleResponse> {
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
}

export function deleteFolder(folderId: string, recursive: boolean = false): ResultAsync<SimpleResponse, SimpleResponse> {
  return safeFetch<SimpleResponse>(
    `/folder/${folderId}?recursive=${recursive}`,
    {
      method: 'DELETE',
    },
    'Failed to delete folder',
  );
}

export function getFile(fileId: string): ResultAsync<Blob, SimpleResponse> {
  return ResultAsync.fromPromise(
    fetch(`${useRuntimeConfig().public.BASE_URL}/file/${fileId}`).then((response) => {
      if (!response.ok) {
        return handleResponse<SimpleResponse>(response).then((errorData) => {
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        });
      }
      return response.blob();
    }),
    (error) => {
      if (error instanceof Error && error.message) {
        return { message: error.message };
      }
      return { message: 'Failed to download file' };
    },
  );
}

export function deleteFile(fileId: string): ResultAsync<SimpleResponse, SimpleResponse> {
  return safeFetch<SimpleResponse>(
    `/file/${fileId}`,
    {
      method: 'DELETE',
    },
    'Failed to delete file',
  );
}

export function uploadFile(folderId: string, file: File): ResultAsync<SimpleResponse, SimpleResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return safeFetch<SimpleResponse>(
    `/file/${folderId}`,
    {
      method: 'POST',
      body: formData,
    },
    'Failed to upload file',
  );
}

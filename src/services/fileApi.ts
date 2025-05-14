import type { SimpleResponse } from '~/models/simpleResponse';
import { ResultAsync } from 'neverthrow';
import { handleResponse, safeFetch } from './api';

export function useFileService() {
  const getFile = (fileId: string): ResultAsync<Blob, SimpleResponse> => {
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
  };

  const deleteFile = (fileId: string): ResultAsync<SimpleResponse, SimpleResponse> => {
    return safeFetch<SimpleResponse>(
      `/file/${fileId}`,
      {
        method: 'DELETE',
      },
      'Failed to delete file',
    );
  };

  const uploadFile = (folderId: string, file: File): ResultAsync<SimpleResponse, SimpleResponse> => {
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
  };

  return { getFile, deleteFile, uploadFile };
}

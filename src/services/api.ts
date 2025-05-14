import type { SimpleResponse } from '../models/simpleResponse';
import { ResultAsync } from 'neverthrow';

export async function handleResponse<T>(response: Response): Promise<T> {
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

export function safeFetch<T>(
  path: string,
  options?: RequestInit,
  errorMessage: string = 'Failed to fetch data',
): ResultAsync<T, SimpleResponse> {
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.BASE_URL;
  const url = `${API_BASE_URL}${path}`;

  const token = useCookie('token').value;

  if (token) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  
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

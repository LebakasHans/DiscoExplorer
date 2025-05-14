import type { ResultAsync } from 'neverthrow';
import type { AuthRequest, AuthResponse } from '~/models/auth';
import type { SimpleResponse } from '~/models/simpleResponse';
import { safeFetch } from './api';

export function useAuthService() {
  const authenticate = (hash: string): ResultAsync<AuthResponse, SimpleResponse> => {
    const body: AuthRequest = { hash };
    return safeFetch<AuthResponse>('/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const validate = (): ResultAsync<SimpleResponse, SimpleResponse> => {
    return safeFetch<SimpleResponse>('/validate');
  };

  return { authenticate, validate };
}

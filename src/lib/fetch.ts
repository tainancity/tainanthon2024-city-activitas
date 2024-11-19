import { nativeFetch } from '@/lib/nativeFetch';

export const fetch = {
  GET: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    nativeFetch(endpoint, {
      method: 'GET',
      ...options,
    }),
  POST: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    nativeFetch(endpoint, {
      method: 'POST',
      ...options,
    }),
  PATCH: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    nativeFetch(endpoint, {
      method: 'PATCH',
      ...options,
    }),
  DELETE: async (endpoint: string, options?: RequestInit): Promise<Response> =>
    nativeFetch(endpoint, {
      method: 'DELETE',
      ...options,
    }),
};

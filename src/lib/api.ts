import { API_URL } from './constants';
import type { ApiResponse, ErrorResponse } from '@/types';

interface FetchOptions extends Omit<RequestInit, 'headers'> {
  token?: string;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  details?: Record<string, string[]> | string;

  constructor(message: string, status: number, details?: Record<string, string[]> | string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...restOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...restOptions,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let errorData: ErrorResponse;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: 'An unexpected error occurred',
        status: response.status,
      };
    }

    throw new ApiError(
      errorData.message || 'Request failed',
      response.status,
      errorData.details
    );
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}

export const api = {
  get<T>(endpoint: string, options?: Omit<FetchOptions, 'body' | 'method'>) {
    return fetchApi<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'body' | 'method'>) {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'body' | 'method'>) {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string, options?: Omit<FetchOptions, 'body' | 'method'>) {
    return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

export async function fetchWithToken(
  endpoint: string,
  token?: string,
  init?: RequestInit
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...init,
    headers,
  });
}

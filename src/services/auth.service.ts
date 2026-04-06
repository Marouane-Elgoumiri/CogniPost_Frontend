import type { CreateUserRequest, LoginUserRequest, UserResponse, UserStatsResponse, AuthResponse } from '@/types';
import { api } from '@/lib/api';

export const authService = {
  login: async (data: LoginUserRequest): Promise<AuthResponse> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }

    const json = await res.json();
    return json.data;
  },

  logout: async (): Promise<void> => {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  refresh: async (): Promise<AuthResponse> => {
    const res = await fetch('/api/auth/refresh', { method: 'POST' });

    if (!res.ok) {
      throw new Error('Token refresh failed');
    }

    const json = await res.json();
    return json.data;
  },

  getMe: async (token?: string): Promise<UserResponse> => {
    return api.get<UserResponse>('/users/me', { token });
  },

  signup: async (data: CreateUserRequest): Promise<UserResponse> => {
    return api.post<UserResponse>('/users', data);
  },
};

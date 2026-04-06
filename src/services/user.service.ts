import type { UserResponse, UserStatsResponse } from '@/types';
import { api } from '@/lib/api';

export const userService = {
  getById: (id: number) => {
    return api.get<UserResponse>(`/users/${id}`);
  },

  getMe: (token: string) => {
    return api.get<UserResponse>('/users/me', { token });
  },

  getStats: (token: string) => {
    return api.get<UserStatsResponse>('/users/me/stats', { token });
  },
};

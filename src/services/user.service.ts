import type { UserResponse, UserStatsResponse } from '@/types';
import { api } from '@/lib/api';

export const userService = {
  getById: (id: number) => {
    return api.get<UserResponse>(`/users/${id}`);
  },

  getMe: () => {
    return api.get<UserResponse>('/api/users/me');
  },

  getStats: () => {
    return api.get<UserStatsResponse>('/api/users/me/stats');
  },
};

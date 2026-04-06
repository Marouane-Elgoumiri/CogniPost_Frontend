import type { FollowResponse } from '@/types';
import { api } from '@/lib/api';

export const followService = {
  toggleFollow: (userId: number) => {
    return api.post<FollowResponse>(`/api/users/${userId}/follow`);
  },
};

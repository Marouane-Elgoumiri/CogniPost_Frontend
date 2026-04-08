import type { UserResponse, UserStatsResponse } from '@/types';
import { api } from '@/lib/api';

export interface UpdateProfileRequest {
	bio?: string;
	image?: string;
}

export const userService = {
	getById: (id: number) => {
		return api.get<UserResponse>(`/api/users/${id}`);
	},

	getMe: () => {
		return api.get<UserResponse>('/api/users/me');
	},

	getStats: () => {
		return api.get<UserStatsResponse>('/api/users/me/stats');
	},

	updateProfile: (data: UpdateProfileRequest) => {
		return api.put<UserResponse>('/api/users/me', data);
	},
};

import { serverFetch } from '@/lib/server-api';
import type { UserResponse, UserStatsResponse } from '@/types';

export interface UpdateUserRequest {
	bio?: string;
	image?: string;
}

export const userServerService = {
	getMe: async () => {
		return serverFetch<UserResponse>('/users/me', { requireAuth: true });
	},

	getStats: async () => {
		return serverFetch<UserStatsResponse>('/users/me/stats', { requireAuth: true });
	},

	getById: async (id: number) => {
		return serverFetch<UserResponse>(`/users/${id}`);
	},

	updateMe: async (data: UpdateUserRequest) => {
		return serverFetch<UserResponse>('/users/me', {
			method: 'PUT',
			body: JSON.stringify(data),
			requireAuth: true,
		});
	},
};

import { serverApi } from '@/lib/server-api';
import type { TagResponse } from '@/types';

export const tagServerService = {
	getAll: async () => {
		return serverApi.get<TagResponse[]>('/tags');
	},

	getBySlug: async (slug: string) => {
		return serverApi.get<TagResponse>(`/tags/${slug}`);
	},
};

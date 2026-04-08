import { serverFetch } from '@/lib/server-api';
import type { PageResponse, ArticleResponse } from '@/types';

export const feedServerService = {
	getFeed: async (params?: { page?: number; size?: number }) => {
		const query = new URLSearchParams();
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		return serverFetch<PageResponse<ArticleResponse>>(`/feed?${query.toString()}`, { requireAuth: true });
	},
};

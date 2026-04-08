import { serverFetch } from '@/lib/server-api';
import type { PageResponse, ArticleResponse } from '@/types';

export const articleServerService = {
	getAll: async (params?: { page?: number; size?: number; sort?: string }) => {
		const query = new URLSearchParams();
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		if (params?.sort) query.set('sort', params.sort);
		return serverFetch<PageResponse<ArticleResponse>>(`/articles?${query.toString()}`);
	},

	getArticleBySlug: async (slug: string) => {
		return serverFetch<ArticleResponse>(`/articles/${slug}`);
	},

	getMyArticles: async (params?: { page?: number; size?: number }) => {
		const query = new URLSearchParams();
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		return serverFetch<PageResponse<ArticleResponse>>(`/articles/my?${query.toString()}`, { requireAuth: true });
	},

	getPopular: async () => {
		return serverFetch<ArticleResponse[]>('/articles/popular');
	},

	search: async (params?: { q?: string; tag?: string; author?: string; page?: number; size?: number }) => {
		const query = new URLSearchParams();
		if (params?.q) query.set('q', params.q);
		if (params?.tag) query.set('tag', params.tag);
		if (params?.author) query.set('author', params.author);
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		return serverFetch<PageResponse<ArticleResponse>>(`/articles/search?${query.toString()}`);
	},
};

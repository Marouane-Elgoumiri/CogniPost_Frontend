import type { ArticleResponse, PageResponse, CreateArticleRequest, UpdateArticleRequest } from '@/types';
import { APP_URL } from '@/lib/constants';

function getApiUrl(path: string): string {
	if (typeof window === 'undefined') {
		return `${APP_URL}${path}`;
	}
	return path;
}

export const articleService = {
	getAll: async (params?: { page?: number; size?: number; sort?: string }) => {
		const query = new URLSearchParams();
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		if (params?.sort) query.set('sort', params.sort);
		const qs = query.toString();
		const res = await fetch(getApiUrl(`/api/articles${qs ? `?${qs}` : ''}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch articles');
		}
		return res.json() as Promise<PageResponse<ArticleResponse>>;
	},

	getBySlug: async (slug: string) => {
		const res = await fetch(getApiUrl(`/api/articles/${slug}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch article');
		}
		return res.json() as Promise<ArticleResponse>;
	},

	getMyArticles: async (params?: { page?: number; size?: number }) => {
		const query = new URLSearchParams();
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		const qs = query.toString();
		const res = await fetch(getApiUrl(`/api/articles/my${qs ? `?${qs}` : ''}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch articles');
		}
		return res.json();
	},

	create: async (data: CreateArticleRequest) => {
		const res = await fetch('/api/articles', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to create article');
		}
		return res.json();
	},

	update: async (slug: string, data: UpdateArticleRequest) => {
		const res = await fetch(`/api/articles/${slug}/update`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to update article');
		}
		return res.json();
	},

	delete: async (slug: string) => {
		const res = await fetch(`/api/articles/${slug}/delete`, {
			method: 'DELETE',
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to delete article');
		}
	},

	search: async (params?: { q?: string; tag?: string; author?: string; page?: number; size?: number }) => {
		const query = new URLSearchParams();
		if (params?.q) query.set('q', params.q);
		if (params?.tag) query.set('tag', params.tag);
		if (params?.author) query.set('author', params.author);
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		const qs = query.toString();
		const res = await fetch(getApiUrl(`/api/articles/search${qs ? `?${qs}` : ''}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to search articles');
		}
		return res.json() as Promise<PageResponse<ArticleResponse>>;
	},

	getPopular: async () => {
		const res = await fetch(getApiUrl('/api/articles/popular'));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch popular articles');
		}
		return res.json() as Promise<ArticleResponse[]>;
	},
};

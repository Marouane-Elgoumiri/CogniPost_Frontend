import type { ArticleResponse, PageResponse } from '@/types';
import { APP_URL } from '@/lib/constants';

function getApiUrl(path: string): string {
	if (typeof window === 'undefined') {
		return `${APP_URL}${path}`;
	}
	return path;
}

export const feedService = {
	getFeed: async (params?: { page?: number; size?: number }) => {
		const query = new URLSearchParams();
		if (params?.page !== undefined) query.set('page', String(params.page));
		if (params?.size !== undefined) query.set('size', String(params.size));
		const qs = query.toString();
		const res = await fetch(getApiUrl(`/api/feed${qs ? `?${qs}` : ''}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch feed');
		}
		return res.json() as Promise<PageResponse<ArticleResponse>>;
	},
};

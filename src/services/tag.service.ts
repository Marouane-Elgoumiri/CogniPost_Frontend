import type { TagResponse } from '@/types';
import { APP_URL } from '@/lib/constants';

function getApiUrl(path: string): string {
	if (typeof window === 'undefined') {
		return `${APP_URL}${path}`;
	}
	return path;
}

export const tagService = {
	getAll: async () => {
		const res = await fetch(getApiUrl('/api/tags'));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch tags');
		}
		return res.json() as Promise<TagResponse[]>;
	},

	getBySlug: async (slug: string) => {
		const res = await fetch(getApiUrl(`/api/tags/${slug}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch tag');
		}
		return res.json() as Promise<TagResponse>;
	},
};

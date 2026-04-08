import type { CommentResponse, CreateCommentRequest } from '@/types';
import { APP_URL } from '@/lib/constants';

function getApiUrl(path: string): string {
	if (typeof window === 'undefined') {
		return `${APP_URL}${path}`;
	}
	return path;
}

export const commentService = {
	getByArticle: async (slug: string) => {
		const res = await fetch(getApiUrl(`/api/comments/${slug}`));
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to fetch comments');
		}
		return res.json() as Promise<CommentResponse[]>;
	},

	create: async (slug: string, data: CreateCommentRequest) => {
		const res = await fetch(getApiUrl(`/api/comments/${slug}`), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to create comment');
		}
		return res.json() as Promise<CommentResponse>;
	},

	delete: async (slug: string, commentId: number) => {
		const res = await fetch(getApiUrl(`/api/comments/${slug}/${commentId}`), {
			method: 'DELETE',
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || 'Failed to delete comment');
		}
	},
};

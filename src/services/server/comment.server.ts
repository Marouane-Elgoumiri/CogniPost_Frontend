import { serverApi } from '@/lib/server-api';
import type { CommentResponse } from '@/types';

export const commentServerService = {
	getByArticle: async (slug: string) => {
		return serverApi.get<CommentResponse[]>(`/articles/${slug}/comments`);
	},
};

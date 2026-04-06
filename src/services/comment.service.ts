import type { CommentResponse, CreateCommentRequest } from '@/types';
import { api } from '@/lib/api';

export const commentService = {
  getByArticle: (slug: string) => {
    return api.get<CommentResponse[]>(`/api/comments/${slug}`);
  },

  create: (slug: string, data: CreateCommentRequest) => {
    return api.post<CommentResponse>(`/api/comments/${slug}`, data);
  },

  delete: (slug: string, commentId: number) => {
    return api.delete<void>(`/api/comments/${slug}/${commentId}`);
  },
};

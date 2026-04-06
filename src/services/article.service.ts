import type { ArticleResponse, PageResponse, CreateArticleRequest, UpdateArticleRequest } from '@/types';
import { api } from '@/lib/api';

export const articleService = {
  getAll: (params?: { page?: number; size?: number; sort?: string }, token?: string) => {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));
    if (params?.sort) query.set('sort', params.sort);
    const qs = query.toString();
    return api.get<PageResponse<ArticleResponse>>(`/articles${qs ? `?${qs}` : ''}`, { token });
  },

  getBySlug: (slug: string, token?: string) => {
    return api.get<ArticleResponse>(`/articles/${slug}`, { token });
  },

  getMyArticles: () => {
    return api.get<PageResponse<ArticleResponse>>('/api/articles/my');
  },

  create: (data: CreateArticleRequest) => {
    return api.post<ArticleResponse>('/api/articles', data);
  },

  update: (slug: string, data: UpdateArticleRequest) => {
    return api.put<ArticleResponse>(`/api/articles/${slug}/update`, data);
  },

  delete: (slug: string) => {
    return api.delete<void>(`/api/articles/${slug}/delete`);
  },

  search: (params?: { q?: string; tag?: string; author?: string; page?: number; size?: number }) => {
    const query = new URLSearchParams();
    if (params?.q) query.set('q', params.q);
    if (params?.tag) query.set('tag', params.tag);
    if (params?.author) query.set('author', params.author);
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));
    const qs = query.toString();
    return api.get<PageResponse<ArticleResponse>>(`/articles/search?${qs}`);
  },

  getPopular: () => {
    return api.get<ArticleResponse[]>('/articles/popular');
  },
};

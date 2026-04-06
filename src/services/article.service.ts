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

  getMyArticles: async (params?: { page?: number; size?: number }) => {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));
    const qs = query.toString();
    const res = await fetch(`/api/articles/my${qs ? `?${qs}` : ''}`);
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

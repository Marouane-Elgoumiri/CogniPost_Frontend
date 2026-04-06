import type { ArticleResponse, PageResponse } from '@/types';
import { api } from '@/lib/api';

export const feedService = {
  getFeed: (params?: { page?: number; size?: number }) => {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));
    const qs = query.toString();
    return api.get<PageResponse<ArticleResponse>>(`/api/feed${qs ? `?${qs}` : ''}`);
  },
};

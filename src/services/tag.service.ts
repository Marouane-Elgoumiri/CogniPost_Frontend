import type { TagResponse } from '@/types';
import { api } from '@/lib/api';

export const tagService = {
  getAll: () => {
    return api.get<TagResponse[]>('/tags');
  },

  getBySlug: (slug: string) => {
    return api.get<TagResponse>(`/tags/${slug}`);
  },
};

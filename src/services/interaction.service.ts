import type { InteractionResponse } from '@/types';
import { api } from '@/lib/api';

export const interactionService = {
  toggleLike: (slug: string) => {
    return api.post<InteractionResponse>(`/api/articles/${slug}/like`);
  },

  toggleBookmark: (slug: string) => {
    return api.post<InteractionResponse>(`/api/articles/${slug}/bookmark`);
  },
};

import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const feedHandlers = [
  // Get personalized feed
  http.get(`${API_URL}/feed`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Unauthorized',
          status: 401,
        },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';

    return HttpResponse.json({
      success: true,
      message: 'Feed fetched',
      data: {
        content: [
          {
            id: 10,
            title: 'Feed Article 1',
            slug: 'feed-article-1',
            subtitle: 'From followed user',
            body: 'Feed article body',
            status: 'PUBLISHED',
            createdAt: '2026-04-06T10:00:00Z',
            updatedAt: '2026-04-06T10:00:00Z',
            author: { id: 2, username: 'followeduser', image: null },
            tags: [{ id: 1, name: 'Technology', slug: 'technology' }],
            readingTimeMinutes: 5,
            likeCount: 50,
            likedByCurrentUser: false,
            bookmarkedByCurrentUser: false,
            commentCount: 10,
            viewCount: 500,
          },
        ],
        page: parseInt(page),
        size: 10,
        totalElements: 1,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];

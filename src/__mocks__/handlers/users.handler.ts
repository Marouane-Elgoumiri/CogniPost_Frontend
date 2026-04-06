import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const userHandlers = [
  // Get user stats
  http.get(`${API_URL}/users/me/stats`, ({ request }) => {
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

    return HttpResponse.json({
      success: true,
      message: 'Stats fetched',
      data: {
        totalArticles: 10,
        publishedArticles: 8,
        draftArticles: 2,
        totalComments: 25,
        totalLikes: 150,
        totalFollowers: 20,
        totalFollowing: 15,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Toggle follow
  http.post(`${API_URL}/users/:id/follow`, ({ request }) => {
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

    return HttpResponse.json({
      success: true,
      message: 'Follow toggled',
      data: {
        following: true,
        count: 21,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];

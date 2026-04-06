import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const commentHandlers = [
  // Get comments for article
  http.get(`${API_URL}/articles/:slug/comments`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Comments fetched',
      data: [
        {
          id: 1,
          title: null,
          body: 'Great article!',
          createdAt: '2026-04-06T12:00:00Z',
          author: { id: 2, username: 'commenter', image: null },
          replies: [
            {
              id: 2,
              title: null,
              body: 'Thanks for the feedback!',
              createdAt: '2026-04-06T13:00:00Z',
              author: { id: 1, username: 'testuser', image: null },
              replies: [],
            },
          ],
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }),

  // Create comment
  http.post(`${API_URL}/articles/:slug/comments`, async ({ request }) => {
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

    const body = (await request.json()) as { body: string; parentId?: number };

    return HttpResponse.json({
      success: true,
      message: 'Comment created',
      data: {
        id: 100,
        title: null,
        body: body.body,
        createdAt: new Date().toISOString(),
        author: { id: 1, username: 'testuser', image: null },
        replies: [],
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Delete comment
  http.delete(`${API_URL}/articles/:slug/comments/:id`, ({ request }) => {
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

    return new HttpResponse(null, { status: 204 });
  }),
];

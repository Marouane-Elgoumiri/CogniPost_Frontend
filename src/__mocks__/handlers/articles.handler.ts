import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const articleHandlers = [
  // Get all articles
  http.get(`${API_URL}/articles`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '10';

    return HttpResponse.json({
      success: true,
      message: 'Articles fetched successfully',
      data: {
        content: [
          {
            id: 1,
            title: 'Test Article 1',
            slug: 'test-article-1',
            subtitle: 'Test subtitle 1',
            body: 'Test body 1',
            status: 'PUBLISHED',
            createdAt: '2026-04-06T10:00:00Z',
            updatedAt: '2026-04-06T10:00:00Z',
            author: { id: 1, username: 'testuser', image: null },
            tags: [{ id: 1, name: 'Technology', slug: 'technology' }],
            readingTimeMinutes: 5,
            likeCount: 10,
            likedByCurrentUser: false,
            bookmarkedByCurrentUser: false,
            commentCount: 2,
            viewCount: 100,
          },
          {
            id: 2,
            title: 'Test Article 2',
            slug: 'test-article-2',
            subtitle: null,
            body: 'Test body 2',
            status: 'PUBLISHED',
            createdAt: '2026-04-05T10:00:00Z',
            updatedAt: '2026-04-05T10:00:00Z',
            author: { id: 2, username: 'anotheruser', image: null },
            tags: [{ id: 2, name: 'Programming', slug: 'programming' }],
            readingTimeMinutes: 8,
            likeCount: 25,
            likedByCurrentUser: true,
            bookmarkedByCurrentUser: true,
            commentCount: 5,
            viewCount: 250,
          },
        ],
        page: parseInt(page),
        size: parseInt(size),
        totalElements: 2,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Get article by slug
  http.get(`${API_URL}/articles/:slug`, ({ params }) => {
    const slug = params.slug as string;

    if (slug === 'nonexistent') {
      return HttpResponse.json(
        {
          success: false,
          message: 'Article not found',
          status: 404,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      message: 'Article fetched successfully',
      data: {
        id: 1,
        title: 'Test Article',
        slug: slug,
        subtitle: 'Test subtitle',
        body: '# Test Article\n\nThis is the **test body** with markdown.',
        status: 'PUBLISHED',
        createdAt: '2026-04-06T10:00:00Z',
        updatedAt: '2026-04-06T10:00:00Z',
        author: { id: 1, username: 'testuser', image: null },
        tags: [
          { id: 1, name: 'Technology', slug: 'technology' },
          { id: 2, name: 'Programming', slug: 'programming' },
        ],
        readingTimeMinutes: 5,
        likeCount: 10,
        likedByCurrentUser: false,
        bookmarkedByCurrentUser: false,
        commentCount: 2,
        viewCount: 100,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Search articles
  http.get(`${API_URL}/articles/search`, ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';

    return HttpResponse.json({
      success: true,
      message: 'Search completed',
      data: {
        content: q.includes('test')
          ? [
              {
                id: 1,
                title: 'Test Article',
                slug: 'test-article',
                subtitle: 'Test subtitle',
                body: 'Test body',
                status: 'PUBLISHED',
                createdAt: '2026-04-06T10:00:00Z',
                updatedAt: '2026-04-06T10:00:00Z',
                author: { id: 1, username: 'testuser', image: null },
                tags: [],
                readingTimeMinutes: 5,
                likeCount: 10,
                likedByCurrentUser: false,
                bookmarkedByCurrentUser: false,
                commentCount: 2,
                viewCount: 100,
              },
            ]
          : [],
        page: 0,
        size: 10,
        totalElements: q.includes('test') ? 1 : 0,
        totalPages: q.includes('test') ? 1 : 0,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Popular articles
  http.get(`${API_URL}/articles/popular`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Popular articles fetched',
      data: [
        {
          id: 1,
          title: 'Popular Article 1',
          slug: 'popular-article-1',
          subtitle: 'Popular subtitle 1',
          body: 'Popular body 1',
          status: 'PUBLISHED',
          createdAt: '2026-04-01T10:00:00Z',
          updatedAt: '2026-04-01T10:00:00Z',
          author: { id: 1, username: 'testuser', image: null },
          tags: [],
          readingTimeMinutes: 10,
          likeCount: 100,
          likedByCurrentUser: false,
          bookmarkedByCurrentUser: false,
          commentCount: 20,
          viewCount: 1000,
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }),

  // My articles
  http.get(`${API_URL}/articles/my`, ({ request }) => {
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
      message: 'My articles fetched',
      data: {
        content: [
          {
            id: 1,
            title: 'My Article',
            slug: 'my-article',
            subtitle: 'My subtitle',
            body: 'My body',
            status: 'PUBLISHED',
            createdAt: '2026-04-06T10:00:00Z',
            updatedAt: '2026-04-06T10:00:00Z',
            author: { id: 1, username: 'testuser', image: null },
            tags: [],
            readingTimeMinutes: 5,
            likeCount: 10,
            likedByCurrentUser: false,
            bookmarkedByCurrentUser: false,
            commentCount: 2,
            viewCount: 100,
          },
          {
            id: 2,
            title: 'My Draft',
            slug: 'my-draft',
            subtitle: 'Draft subtitle',
            body: 'Draft body',
            status: 'DRAFT',
            createdAt: '2026-04-06T11:00:00Z',
            updatedAt: '2026-04-06T11:00:00Z',
            author: { id: 1, username: 'testuser', image: null },
            tags: [],
            readingTimeMinutes: 3,
            likeCount: 0,
            likedByCurrentUser: false,
            bookmarkedByCurrentUser: false,
            commentCount: 0,
            viewCount: 0,
          },
        ],
        page: 0,
        size: 10,
        totalElements: 2,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Create article
  http.post(`${API_URL}/articles`, async ({ request }) => {
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

    const body = (await request.json()) as {
      title: string;
      subtitle?: string;
      body: string;
      tags?: string[];
    };

    return HttpResponse.json({
      success: true,
      message: 'Article created',
      data: {
        id: 100,
        title: body.title,
        slug: body.title.toLowerCase().replace(/\s+/g, '-'),
        subtitle: body.subtitle || null,
        body: body.body,
        status: 'DRAFT',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: { id: 1, username: 'testuser', image: null },
        tags: (body.tags || []).map((t, i) => ({ id: i + 1, name: t, slug: t.toLowerCase() })),
        readingTimeMinutes: 5,
        likeCount: 0,
        likedByCurrentUser: false,
        bookmarkedByCurrentUser: false,
        commentCount: 0,
        viewCount: 0,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Update article
  http.put(`${API_URL}/articles/:slug`, async ({ request, params }) => {
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

    const body = (await request.json()) as {
      title?: string;
      subtitle?: string;
      body?: string;
      tags?: string[];
    };

    return HttpResponse.json({
      success: true,
      message: 'Article updated',
      data: {
        id: 1,
        title: body.title || 'Updated Article',
        slug: params.slug,
        subtitle: body.subtitle || null,
        body: body.body || 'Updated body',
        status: 'PUBLISHED',
        createdAt: '2026-04-06T10:00:00Z',
        updatedAt: new Date().toISOString(),
        author: { id: 1, username: 'testuser', image: null },
        tags: [],
        readingTimeMinutes: 5,
        likeCount: 10,
        likedByCurrentUser: false,
        bookmarkedByCurrentUser: false,
        commentCount: 2,
        viewCount: 100,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Delete article
  http.delete(`${API_URL}/articles/:slug`, ({ request }) => {
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

  // Toggle like
  http.post(`${API_URL}/articles/:slug/like`, ({ request }) => {
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
      message: 'Like toggled',
      data: {
        action: true,
        count: 11,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Toggle bookmark
  http.post(`${API_URL}/articles/:slug/bookmark`, ({ request }) => {
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
      message: 'Bookmark toggled',
      data: {
        action: true,
        count: 5,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];

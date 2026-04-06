import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const tagHandlers = [
  // Get all tags
  http.get(`${API_URL}/tags`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Tags fetched',
      data: [
        { id: 1, name: 'Technology', slug: 'technology' },
        { id: 2, name: 'Programming', slug: 'programming' },
        { id: 3, name: 'JavaScript', slug: 'javascript' },
      ],
      timestamp: new Date().toISOString(),
    });
  }),

  // Get tag by slug
  http.get(`${API_URL}/tags/:slug`, ({ params }) => {
    const slug = params.slug as string;

    if (slug === 'nonexistent') {
      return HttpResponse.json(
        {
          success: false,
          message: 'Tag not found',
          status: 404,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      message: 'Tag fetched',
      data: {
        id: 1,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        slug: slug,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];

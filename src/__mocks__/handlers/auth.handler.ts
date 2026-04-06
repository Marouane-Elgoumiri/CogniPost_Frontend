import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const authHandlers = [
  // Login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = await request.json() as { username: string; password: string };
    
    if (body.username === 'testuser' && body.password === 'password123') {
      return HttpResponse.json({
        success: true,
        message: 'Login successful',
        data: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            bio: 'Test user bio',
            image: null,
            roles: ['ROLE_USER'],
          },
        },
        timestamp: new Date().toISOString(),
      });
    }
    
    return HttpResponse.json(
      {
        success: false,
        message: 'Invalid credentials',
        status: 401,
      },
      { status: 401 }
    );
  }),

  // Logout
  http.post(`${API_URL}/auth/logout`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully',
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),

  // Get current user
  http.get(`${API_URL}/users/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.includes('mock-access-token')) {
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
      message: 'User fetched successfully',
      data: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        bio: 'Test user bio',
        image: null,
        roles: ['ROLE_USER'],
        followerCount: 5,
        followingCount: 10,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Refresh token
  http.post(`${API_URL}/auth/refresh`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Token refreshed',
      data: {
        accessToken: 'new-mock-access-token',
        refreshToken: 'new-mock-refresh-token',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          bio: 'Test user bio',
          image: null,
          roles: ['ROLE_USER'],
        },
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Signup
  http.post(`${API_URL}/users`, async ({ request }) => {
    const body = await request.json() as { username: string; email: string; password: string };
    
    return HttpResponse.json({
      success: true,
      message: 'User created successfully',
      data: {
        id: 2,
        username: body.username,
        email: body.email,
        bio: null,
        image: null,
        roles: ['ROLE_USER'],
      },
      timestamp: new Date().toISOString(),
    });
  }),
];

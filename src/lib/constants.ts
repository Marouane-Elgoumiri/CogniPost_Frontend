export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  articles: '/articles',
  search: '/search',
  tags: '/tags',
  popular: '/popular',
  dashboard: '/dashboard',
  myArticles: '/my-articles',
  feed: '/feed',
  settings: '/settings',
} as const;

export const COOKIES = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
} as const;

export const TOKEN_EXPIRY = {
  access: 15 * 60,
  refresh: 7 * 24 * 60 * 60,
} as const;

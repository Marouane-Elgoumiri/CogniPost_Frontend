export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ErrorResponse {
  message: string;
  status: number;
  details?: Record<string, string[]> | string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  roles: string[];
  followerCount: number;
  followingCount: number;
}

export interface UserStatsResponse {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalComments: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
}

export interface AuthUserDto {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  roles: string[];
}

export interface ArticleResponse {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  body: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  author: AuthorInfo;
  tags: TagInfo[];
  readingTimeMinutes: number;
  likeCount: number;
  likedByCurrentUser: boolean;
  bookmarkedByCurrentUser: boolean;
  commentCount: number;
  viewCount: number;
}

export interface AuthorInfo {
  id: number;
  username: string;
  image: string | null;
}

export interface TagInfo {
  id: number;
  name: string;
  slug: string;
}

export interface CommentResponse {
  id: number;
  title: string | null;
  body: string;
  createdAt: string;
  author: CommentAuthor;
  replies: CommentResponse[];
}

export interface CommentAuthor {
  id: number;
  username: string;
  image: string | null;
}

export interface TagResponse {
  id: number;
  name: string;
  slug: string;
}

export interface InteractionResponse {
  action: boolean;
  count: number;
}

export interface FollowResponse {
  following: boolean;
  count: number;
}

export interface CreateArticleRequest {
  title: string;
  subtitle?: string;
  body: string;
  tags?: string[];
}

export interface UpdateArticleRequest {
  title?: string;
  subtitle?: string;
  body?: string;
  tags?: string[];
}

export interface CreateCommentRequest {
  title?: string;
  body: string;
  parentId?: number;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
});

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  subtitle: z.string().max(500).optional().or(z.literal('')),
  body: z.string().min(1, 'Body is required'),
  tags: z.array(z.string()).optional(),
});

export const commentSchema = z.object({
  title: z.string().max(200).optional().or(z.literal('')),
  body: z.string().min(1, 'Comment body is required').max(2000),
  parentId: z.number().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ArticleFormData = z.infer<typeof articleSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;

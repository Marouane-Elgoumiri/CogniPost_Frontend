import { describe, it, expect } from 'vitest';
import { loginSchema, signupSchema, articleSchema, commentSchema } from '@/lib/validators';

describe('validators', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const result = loginSchema.safeParse({
        username: 'testuser',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('requires username', () => {
      const result = loginSchema.safeParse({
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Username is required');
      }
    });

    it('requires password with min length', () => {
      const result = loginSchema.safeParse({
        username: 'testuser',
        password: '12345',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters');
      }
    });
  });

  describe('signupSchema', () => {
    it('validates correct signup data', () => {
      const result = signupSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('requires valid email', () => {
      const result = signupSchema.safeParse({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });

    it('requires username min length', () => {
      const result = signupSchema.safeParse({
        username: 'ab',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Username must be at least 3 characters');
      }
    });

    it('requires password max length', () => {
      const result = signupSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'a'.repeat(101),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('articleSchema', () => {
    it('validates correct article data', () => {
      const result = articleSchema.safeParse({
        title: 'Test Article',
        body: 'Test content',
      });
      expect(result.success).toBe(true);
    });

    it('validates article with all fields', () => {
      const result = articleSchema.safeParse({
        title: 'Test Article',
        subtitle: 'Test subtitle',
        body: 'Test content',
        tags: ['tag1', 'tag2'],
      });
      expect(result.success).toBe(true);
    });

    it('requires title', () => {
      const result = articleSchema.safeParse({
        body: 'Test content',
      });
      expect(result.success).toBe(false);
    });

    it('requires body', () => {
      const result = articleSchema.safeParse({
        title: 'Test Article',
      });
      expect(result.success).toBe(false);
    });

    it('validates title max length', () => {
      const result = articleSchema.safeParse({
        title: 'a'.repeat(201),
        body: 'Test content',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('commentSchema', () => {
    it('validates correct comment data', () => {
      const result = commentSchema.safeParse({
        body: 'Test comment',
      });
      expect(result.success).toBe(true);
    });

    it('validates comment with title', () => {
      const result = commentSchema.safeParse({
        title: 'Comment title',
        body: 'Test comment',
      });
      expect(result.success).toBe(true);
    });

    it('validates comment with parentId', () => {
      const result = commentSchema.safeParse({
        body: 'Test reply',
        parentId: 1,
      });
      expect(result.success).toBe(true);
    });

    it('requires body', () => {
      const result = commentSchema.safeParse({
        title: 'Comment title',
      });
      expect(result.success).toBe(false);
    });

    it('validates body max length', () => {
      const result = commentSchema.safeParse({
        body: 'a'.repeat(2001),
      });
      expect(result.success).toBe(false);
    });
  });
});

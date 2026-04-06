import { describe, it, expect } from 'vitest';
import { formatDate, formatRelativeTime, truncate } from '@/lib/utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('formats a valid date string', () => {
      const result = formatDate('2026-04-06T10:00:00Z');
      expect(result).toBe('April 6, 2026');
    });

    it('formats a Date object', () => {
      const date = new Date('2026-04-06T10:00:00Z');
      const result = formatDate(date);
      expect(result).toBe('April 6, 2026');
    });

    it('handles different date formats', () => {
      const result = formatDate('2026-01-15');
      expect(result).toBe('January 15, 2026');
    });
  });

  describe('formatRelativeTime', () => {
    it('returns "just now" for recent dates (< 60 seconds)', () => {
      const now = new Date();
      const result = formatRelativeTime(now);
      expect(result).toBe('just now');
    });

    it('returns minutes ago for dates within an hour', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      const result = formatRelativeTime(date);
      expect(result).toBe('5m ago');
    });

    it('returns hours ago for dates within a day', () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
      const result = formatRelativeTime(date);
      expect(result).toBe('3h ago');
    });

    it('returns days ago for dates within a week', () => {
      const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date);
      expect(result).toBe('2d ago');
    });

    it('returns formatted date for dates older than a week', () => {
      const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date);
      expect(result).toMatch(/^\w+ \d+, \d{4}$/);
    });
  });

  describe('truncate', () => {
    it('truncates strings longer than limit', () => {
      const result = truncate('Hello World', 5);
      expect(result).toBe('Hello...');
    });

    it('does not truncate strings at limit', () => {
      const result = truncate('Hello', 5);
      expect(result).toBe('Hello');
    });

    it('does not truncate strings shorter than limit', () => {
      const result = truncate('Hi', 5);
      expect(result).toBe('Hi');
    });

    it('handles empty strings', () => {
      const result = truncate('', 5);
      expect(result).toBe('');
    });
  });
});

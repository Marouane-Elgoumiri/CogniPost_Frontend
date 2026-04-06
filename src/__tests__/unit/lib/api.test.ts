import { describe, it, expect, vi } from 'vitest';
import { api, ApiError } from '@/lib/api';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('api', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('api.get', () => {
    it('makes a GET request and returns data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Success',
          data: { id: 1, name: 'Test' },
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await api.get('/test');
      expect(result).toEqual({ id: 1, name: 'Test' });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('throws ApiError on non-OK response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({
          message: 'Not found',
          status: 404,
        }),
      });

      await expect(api.get('/test')).rejects.toThrow(ApiError);
    });
  });

  describe('api.post', () => {
    it('makes a POST request with body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Created',
          data: { id: 1 },
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await api.post('/test', { name: 'Test' });
      expect(result).toEqual({ id: 1 });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Test' }),
        })
      );
    });
  });

  describe('api.put', () => {
    it('makes a PUT request with body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Updated',
          data: { id: 1, name: 'Updated' },
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await api.put('/test/1', { name: 'Updated' });
      expect(result).toEqual({ id: 1, name: 'Updated' });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ name: 'Updated' }),
        })
      );
    });
  });

  describe('api.delete', () => {
    it('makes a DELETE request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await api.delete('/test/1');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  describe('ApiError', () => {
    it('creates error with message and status', () => {
      const error = new ApiError('Test error', 404);
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.name).toBe('ApiError');
    });

    it('creates error with details', () => {
      const details = { field: ['Invalid value'] };
      const error = new ApiError('Validation error', 422, details);
      expect(error.details).toEqual(details);
    });
  });
});

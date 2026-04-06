import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/constants';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('accessToken')?.value;

    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch {
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
  response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

  return response;
}

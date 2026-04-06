import { NextRequest, NextResponse } from 'next/server';
import { API_URL, TOKEN_EXPIRY } from '@/lib/constants';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }

    const data = await res.json();
    const { accessToken, refreshToken, user } = data.data;

    const response = NextResponse.json(data);

    if (accessToken) {
      response.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: TOKEN_EXPIRY.access,
      });
    }

    if (refreshToken) {
      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: TOKEN_EXPIRY.refresh,
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}

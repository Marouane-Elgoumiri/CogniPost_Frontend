import { NextRequest, NextResponse } from 'next/server';
import { API_URL, TOKEN_EXPIRY } from '@/lib/constants';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'No refresh token', status: 401 },
        { status: 401 }
      );
    }

    const res = await fetch(`${API_URL}/auth/refresh?refreshToken=${refreshToken}`, {
      method: 'POST',
    });

    if (!res.ok) {
      const response = NextResponse.json(
        { message: 'Invalid refresh token', status: 401 },
        { status: 401 }
      );
      response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
      response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
      return response;
    }

    const data = await res.json();
    const { accessToken, refreshToken: newRefreshToken } = data.data;

    const response = NextResponse.json(data);

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: TOKEN_EXPIRY.access,
    });

    response.cookies.set('refreshToken', newRefreshToken || refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: TOKEN_EXPIRY.refresh,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}

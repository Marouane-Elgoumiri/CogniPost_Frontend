import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated', status: 401 },
        { status: 401 }
      );
    }

    const res = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Invalid token', status: 401 },
        { status: 401 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}

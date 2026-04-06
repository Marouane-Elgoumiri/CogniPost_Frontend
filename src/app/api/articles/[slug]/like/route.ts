import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/constants';

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized', status: 401 },
        { status: 401 }
      );
    }

    const res = await fetch(`${API_URL}/articles/${params.slug}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
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

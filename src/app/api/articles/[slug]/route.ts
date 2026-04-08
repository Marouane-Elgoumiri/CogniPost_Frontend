import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/constants';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${API_URL}/articles/${params.slug}`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }

    const json = await res.json();
    return NextResponse.json(json.data || json);
  } catch {
    return NextResponse.json(
      { message: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}

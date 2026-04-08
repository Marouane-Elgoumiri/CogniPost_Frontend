import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const tag = searchParams.get('tag') || '';
    const author = searchParams.get('author') || '';
    const page = searchParams.get('page') || '0';
    const size = searchParams.get('size') || '10';

    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tag) params.set('tag', tag);
    if (author) params.set('author', author);
    params.set('page', page);
    params.set('size', size);

    const res = await fetch(`${API_URL}/articles/search?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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

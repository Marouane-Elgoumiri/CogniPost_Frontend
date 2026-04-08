import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/constants';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const res = await fetch(`${API_URL}/tags/${params.slug}`, {
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

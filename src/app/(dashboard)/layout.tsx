import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import type { UserResponse } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Home, Settings, PenSquare } from 'lucide-react';

async function getCurrentUser(): Promise<UserResponse | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            CogniPost
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">{user.username}</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-48 flex-shrink-0">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/my-articles">
                  <FileText className="h-4 w-4 mr-2" />
                  My Articles
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/new">
                  <PenSquare className="h-4 w-4 mr-2" />
                  New Article
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

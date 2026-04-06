'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth.context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, LayoutDashboard, FileText, PenSquare, Rss } from 'lucide-react';

export function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith('/dashboard') || 
                      pathname?.startsWith('/my-articles') || 
                      pathname?.startsWith('/edit') ||
                      pathname?.startsWith('/feed') ||
                      pathname?.startsWith('/settings') ||
                      pathname?.startsWith('/new');

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        </div>
      </header>
    );
  }

  if (isDashboard && user) {
    return <DashboardNavbar user={user} logout={logout} />;
  }

  return <LandingNavbar user={user} logout={logout} />;
}

function LandingNavbar({ user, logout }: { user: any; logout: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg">
            CogniPost
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
              Articles
            </Link>
            <Link href="/tags" className="text-muted-foreground hover:text-foreground transition-colors">
              Tags
            </Link>
            <Link href="/popular" className="text-muted-foreground hover:text-foreground transition-colors">
              Popular
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function DashboardNavbar({ user, logout }: { user: any; logout: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg">
            CogniPost
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/feed" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <Rss className="h-4 w-4" />
              Feed
            </Link>
            <Link href="/my-articles" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              My Articles
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href="/new">
              <PenSquare className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

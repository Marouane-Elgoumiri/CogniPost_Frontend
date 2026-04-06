import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import { userService } from '@/services/user.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, Heart, Users, BookOpen } from 'lucide-react';
import { QuickActions } from '@/components/dashboard/quick-actions';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard | CogniPost',
  description: 'Author dashboard and statistics',
};

async function getCurrentUser() {
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

async function StatsCards() {
  let stats;
  try {
    stats = await userService.getStats();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return (
      <div className="text-center py-8 text-muted-foreground">
        Failed to load statistics
      </div>
    );
  }

  const statItems = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Published',
      value: stats.publishedArticles,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Drafts',
      value: stats.draftArticles,
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    },
    {
      title: 'Total Views',
      value: stats.totalComments,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Total Likes',
      value: stats.totalLikes,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      title: 'Followers',
      value: stats.totalFollowers,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statItems.map((stat) => (
        <Card key={stat.title} className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.username}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your activity.
        </p>
      </div>

      <QuickActions />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
        <StatsCards />
      </div>

      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Link href="/my-articles" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">
          Your recent articles and interactions will appear here.
        </p>
      </div>
    </div>
  );
}

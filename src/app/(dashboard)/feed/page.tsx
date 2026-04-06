import { Metadata } from 'next';
import Link from 'next/link';
import { feedService } from '@/services/feed.service';
import { ArticleCard } from '@/components/articles/article-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Rss } from 'lucide-react';
import type { ArticleResponse } from '@/types';

export const metadata: Metadata = {
  title: 'Your Feed | CogniPost',
  description: 'Personalized feed from authors you follow',
};

async function FeedList() {
  let articles: ArticleResponse[] = [];
  try {
    const data = await feedService.getFeed({ page: 0, size: 20 });
    articles = data.content;
  } catch (error) {
    console.error('Failed to fetch feed:', error);
  }

  if (!articles.length) {
    return (
      <div className="text-center py-16">
        <Rss className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No articles in your feed</h3>
        <p className="text-muted-foreground mb-6">
          Follow some authors to see their articles here.
        </p>
        <Button asChild>
          <Link href="/articles">Browse Articles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function FeedSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function FeedPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Feed</h1>
        <p className="text-muted-foreground">
          Articles from authors you follow
        </p>
      </div>
      <Suspense fallback={<FeedSkeleton />}>
        <FeedList />
      </Suspense>
    </div>
  );
}

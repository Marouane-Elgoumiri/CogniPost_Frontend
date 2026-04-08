import { ArticleCard } from '@/components/articles/article-card';
import { articleService } from '@/services/article.service';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function ArticlesGrid() {
  try {
    const data = await articleService.getAll({ page: 0, size: 6, sort: 'createdAt,desc' });

    if (!data?.content?.length) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No articles yet. Be the first to write one!</p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.content.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    );
  } catch {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Unable to load articles. Please try again later.</p>
      </div>
    );
  }
}

function ArticlesSkeleton() {
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

export function LatestArticles() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
        </div>
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesGrid />
        </Suspense>
      </div>
    </section>
  );
}

import { Metadata } from 'next';
import { ArticleCard } from '@/components/articles/article-card';
import { articleServerService } from '@/services/server/article.server';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/shared/pagination';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Articles | CogniPost',
  description: 'Browse all published articles',
};

async function ArticleList({ page }: { page: number }) {
	try {
		const data = await articleServerService.getAll({ page, size: 10, sort: 'createdAt,desc' });

    if (!data?.content?.length) {
      return (
        <div className="text-center py-16 text-muted-foreground">
          <p>No articles yet. Be the first to write one!</p>
        </div>
      );
    }

    return (
      <>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.content.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <Pagination page={page} totalPages={data.totalPages} />
      </>
    );
  } catch {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>Unable to load articles. Please try again later.</p>
      </div>
    );
  }
}

function ArticleListSkeleton() {
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

export default function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Articles</h1>
      <Suspense key={page} fallback={<ArticleListSkeleton />}>
        <ArticleList page={page} />
      </Suspense>
    </div>
  );
}

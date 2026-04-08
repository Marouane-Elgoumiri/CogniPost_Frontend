import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tagServerService } from '@/services/server/tag.server';
import { articleServerService } from '@/services/server/article.server';
import { ArticleCard } from '@/components/articles/article-card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/shared/pagination';
import { Suspense } from 'react';

type Props = {
  params: { slug: string };
  searchParams: { page?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const tag = await tagServerService.getBySlug(params.slug);
    return {
      title: `${tag.name} Articles | CogniPost`,
      description: `Articles tagged with ${tag.name}`,
    };
  } catch {
    return { title: 'Tag Not Found | CogniPost' };
  }
}

async function TagArticles({ slug, page }: { slug: string; page: number }) {
	try {
		const data = await articleServerService.search({ tag: slug, page, size: 10 });

    if (!data?.content?.length) {
      return (
        <div className="text-center py-16 text-muted-foreground">
          <p>No articles found for this tag.</p>
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
        <Pagination page={page} totalPages={data.totalPages} basePath={`/tags/${slug}`} />
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

function TagArticlesSkeleton() {
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

export default async function TagDetailPage({ params, searchParams }: Props) {
	let tag;
	try {
		tag = await tagServerService.getBySlug(params.slug);
  } catch {
    notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/tags" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block">
          ← Back to tags
        </Link>
        <Badge variant="secondary" className="text-lg px-4 py-1.5">
          {tag.name}
        </Badge>
      </div>
      <Suspense key={`${params.slug}-${page}`} fallback={<TagArticlesSkeleton />}>
        <TagArticles slug={params.slug} page={page} />
      </Suspense>
    </div>
  );
}

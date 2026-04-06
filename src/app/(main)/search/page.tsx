import { Metadata } from 'next';
import { articleService } from '@/services/article.service';
import { ArticleCard } from '@/components/articles/article-card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/shared/pagination';
import { Suspense } from 'react';
import { X, Search } from 'lucide-react';
import Link from 'next/link';

type Props = {
  searchParams: { q?: string; tag?: string; author?: string; page?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query ? `Search: "${query}" | CogniPost` : 'Search | CogniPost',
    description: `Search results for "${query}"`,
  };
}

async function SearchResults({ params }: { params: { q?: string; tag?: string; author?: string; page: number } }) {
  const data = await articleService.search({
    q: params.q,
    tag: params.tag,
    author: params.author,
    page: params.page,
    size: 10,
  });

  if (!data.content.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg">No articles found matching your search.</p>
        <p className="text-sm mt-2">Try different keywords or browse all articles.</p>
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
      <Pagination page={params.page} totalPages={data.totalPages} basePath="/search" />
    </>
  );
}

function SearchResultsSkeleton() {
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

function SearchFilters({ q, tag, author }: { q?: string; tag?: string; author?: string }) {
  const hasFilters = q || tag || author;
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">Filters:</span>
      {q && (
        <Badge variant="secondary" className="gap-1">
          Search: &quot;{q}&quot;
        </Badge>
      )}
      {tag && (
        <Link href={`/search?q=${q || ''}${author ? `&author=${author}` : ''}`}>
          <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-accent">
            Tag: {tag}
            <X className="h-3 w-3" />
          </Badge>
        </Link>
      )}
      {author && (
        <Link href={`/search?q=${q || ''}${tag ? `&tag=${tag}` : ''}`}>
          <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-accent">
            Author: {author}
            <X className="h-3 w-3" />
          </Badge>
        </Link>
      )}
    </div>
  );
}

export default function SearchPage({ searchParams }: Props) {
  const q = searchParams.q || '';
  const tag = searchParams.tag;
  const author = searchParams.author;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {q ? `Search Results` : 'Search'}
      </h1>
      {q && (
        <p className="text-muted-foreground mb-6">
          Showing results for &quot;{q}&quot;
        </p>
      )}
      <SearchFilters q={q} tag={tag} author={author} />
      <Suspense key={`search-${q}-${tag}-${author}-${page}`} fallback={<SearchResultsSkeleton />}>
        <SearchResults params={{ q, tag, author, page }} />
      </Suspense>
    </div>
  );
}

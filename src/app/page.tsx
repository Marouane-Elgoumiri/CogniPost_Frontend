import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ArticleCard } from '@/components/articles/article-card';
import { articleService } from '@/services/article.service';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function LatestArticles() {
  const data = await articleService.getAll({ page: 0, size: 6, sort: 'createdAt,desc' });

  if (!data.content.length) {
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
}

function LatestArticlesSkeleton() {
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Welcome to CogniPost
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            A modern blog platform for sharing ideas and knowledge.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/articles">Browse Articles</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Latest Articles</h2>
            <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <Suspense fallback={<LatestArticlesSkeleton />}>
            <LatestArticles />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}

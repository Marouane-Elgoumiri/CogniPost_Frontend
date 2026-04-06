import { Metadata } from 'next';
import Link from 'next/link';
import { articleService } from '@/services/article.service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils';
import { Edit, Eye, Plus } from 'lucide-react';
import { DeleteArticleButton } from '@/components/articles/delete-article-button';
import type { ArticleResponse } from '@/types';

export const metadata: Metadata = {
  title: 'My Articles | CogniPost',
  description: 'Manage your articles',
};

async function MyArticlesList() {
  let articles: ArticleResponse[] = [];
  try {
    const data = await articleService.getMyArticles();
    articles = data.content;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }

  if (!articles.length) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">You haven&apos;t written any articles yet.</p>
        <Button asChild>
          <Link href="/new">
            <Plus className="h-4 w-4 mr-2" />
            Write your first article
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="border rounded-lg p-4 flex items-start justify-between gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{article.title}</h3>
              <Badge variant={article.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                {article.status}
              </Badge>
            </div>
            {article.subtitle && (
              <p className="text-sm text-muted-foreground truncate mb-2">
                {article.subtitle}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{formatRelativeTime(article.createdAt)}</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.viewCount} views
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit/${article.slug}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            {article.status === 'PUBLISHED' && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/articles/${article.slug}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <DeleteArticleButton articleSlug={article.slug} articleTitle={article.title} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MyArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Articles</h1>
        <Button asChild>
          <Link href="/new">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Link>
        </Button>
      </div>
      <MyArticlesList />
    </div>
  );
}

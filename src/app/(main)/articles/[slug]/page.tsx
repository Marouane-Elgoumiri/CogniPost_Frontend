import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articleServerService } from '@/services/server/article.server';
import { commentServerService } from '@/services/server/comment.server';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils';
import { Clock, Eye, Heart, MessageSquare, Bookmark, FileEdit } from 'lucide-react';
import Link from 'next/link';
import { CommentsSection } from '@/components/comments/comments-section';
import { LikeButton } from '@/components/shared/like-button';
import { BookmarkButton } from '@/components/shared/bookmark-button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const article = await articleServerService.getArticleBySlug(params.slug);
		return {
      title: `${article.title} | CogniPost`,
      description: article.subtitle || article.body.slice(0, 160),
      openGraph: {
        title: article.title,
        description: article.subtitle || article.body.slice(0, 160),
        type: 'article',
        publishedTime: article.createdAt,
        authors: [article.author.username],
        tags: article.tags.map((t) => t.name),
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.subtitle || article.body.slice(0, 160),
      },
    };
  } catch {
    return { title: 'Article Not Found | CogniPost' };
  }
}

export default async function ArticlePage({ params }: Props) {
	let article;
	let comments = [];
	try {
		article = await articleServerService.getArticleBySlug(params.slug);
		comments = await commentServerService.getByArticle(params.slug);
	} catch {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        {article.status === 'DRAFT' && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <FileEdit className="h-4 w-4" />
            <span className="text-sm font-medium">This is a draft article - only you can see it</span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">{article.title}</h1>
        {article.subtitle && (
          <p className="text-xl text-muted-foreground mb-4">{article.subtitle}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{article.author.username}</span>
          <span>·</span>
          <span>{formatRelativeTime(article.createdAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {article.readingTimeMinutes} min read
          </span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.viewCount} views
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {article.commentCount} comments
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LikeButton
              slug={params.slug}
              initialLiked={article.likedByCurrentUser}
              initialCount={article.likeCount}
            />
            <BookmarkButton
              slug={params.slug}
              initialBookmarked={article.bookmarkedByCurrentUser}
            />
          </div>
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
      </div>

      <CommentsSection
        articleSlug={params.slug}
        initialComments={comments}
        currentUserId={article.author.id}
      />
    </article>
  );
}

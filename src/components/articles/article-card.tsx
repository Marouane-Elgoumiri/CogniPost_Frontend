import Link from 'next/link';
import type { ArticleResponse } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { Eye, MessageSquare, Heart, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: ArticleResponse;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{article.author.username}</span>
          <span>·</span>
          <span>{formatRelativeTime(article.createdAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readingTimeMinutes} min read
          </span>
        </div>
        <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
          <h2 className="text-xl font-semibold leading-tight line-clamp-2">
            {article.title}
          </h2>
        </Link>
        {article.subtitle && (
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {article.subtitle}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {article.viewCount}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          {article.likeCount}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {article.commentCount}
        </span>
      </CardFooter>
    </Card>
  );
}

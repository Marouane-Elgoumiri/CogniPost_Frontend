'use client';

import { useState } from 'react';
import { commentService } from '@/services/comment.service';
import { CommentThread, CommentForm } from '@/components/comments/comment-thread';
import { Skeleton } from '@/components/ui/skeleton';
import type { CommentResponse } from '@/types';

interface CommentsSectionProps {
  articleSlug: string;
  initialComments: CommentResponse[];
  currentUserId?: number;
}

export function CommentsSection({ articleSlug, initialComments, currentUserId }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentResponse[]>(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommentCreated = () => {
    loadComments();
  };

  const handleCommentDeleted = (commentId: number) => {
    setComments((prev) => filterCommentById(prev, commentId));
  };

  const filterCommentById = (comments: CommentResponse[], id: number): CommentResponse[] => {
    return comments
      .filter((c) => c.id !== id)
      .map((c) => ({
        ...c,
        replies: filterCommentById(c.replies, id),
      }));
  };

  const loadComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await commentService.getByArticle(articleSlug);
      setComments(data);
    } catch {
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 pt-6 border-t">
      <h2 className="text-xl font-semibold mb-6">Comments ({comments.length})</h2>
      <div className="mb-8">
        <CommentForm articleSlug={articleSlug} onSuccess={handleCommentCreated} />
      </div>
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
          {error}
          <button onClick={loadComments} className="ml-2 underline hover:no-underline">
            Retry
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CommentThread
          comments={comments}
          articleSlug={articleSlug}
          currentUserId={currentUserId}
          onDelete={handleCommentDeleted}
        />
      )}
    </div>
  );
}

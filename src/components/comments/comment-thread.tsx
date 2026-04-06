'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { commentService } from '@/services/comment.service';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatRelativeTime } from '@/lib/utils';
import { MessageSquare, Trash2, Reply } from 'lucide-react';

interface CommentThreadProps {
  comments: import('@/types').CommentResponse[];
  articleSlug: string;
  currentUserId?: number;
  onDelete: (commentId: number) => void;
}

export function CommentThread({ comments, articleSlug, currentUserId, onDelete }: CommentThreadProps) {
  if (!comments.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          articleSlug={articleSlug}
          currentUserId={currentUserId}
          onDelete={onDelete}
          depth={0}
        />
      ))}
    </div>
  );
}

interface CommentItemProps {
  comment: import('@/types').CommentResponse;
  articleSlug: string;
  currentUserId?: number;
  onDelete: (commentId: number) => void;
  depth: number;
}

function CommentItem({ comment, articleSlug, currentUserId, onDelete, depth }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const isOwner = user?.id === comment.author.id || currentUserId === comment.author.id;

  const handleDelete = async () => {
    if (!user || !confirm('Are you sure you want to delete this comment?')) return;
    setIsDeleting(true);
    try {
      await commentService.delete(articleSlug, comment.id);
      onDelete(comment.id);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplySubmitted = () => {
    setShowReply(false);
    router.refresh();
  };

  return (
    <div className={depth > 0 ? 'ml-8 pl-4 border-l border-border' : ''}>
      <div className="flex gap-3">
        <Avatar username={comment.author.username} image={comment.author.image} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.body}</p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Reply className="h-3 w-3" />
              Reply
            </button>
            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
          {showReply && (
            <div className="mt-3">
              <CommentForm
                articleSlug={articleSlug}
                parentId={comment.id}
                onSuccess={handleReplySubmitted}
                onCancel={() => setShowReply(false)}
              />
            </div>
          )}
          {comment.replies.length > 0 && (
            <div className="mt-4">
              <CommentThread
                comments={comment.replies}
                articleSlug={articleSlug}
                currentUserId={currentUserId}
                onDelete={onDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CommentFormProps {
  articleSlug: string;
  parentId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function CommentForm({ articleSlug, parentId, onSuccess, onCancel }: CommentFormProps) {
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || !user) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await commentService.create(articleSlug, { body, parentId });
      setBody('');
      onSuccess?.();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={parentId ? 'Write a reply...' : 'Write a comment...'}
        className="min-h-[80px] text-sm"
        required
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={isSubmitting || !body.trim()}>
          {isSubmitting ? 'Submitting...' : parentId ? 'Reply' : 'Comment'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export { CommentForm };

interface AvatarProps {
  username: string;
  image?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

function Avatar({ username, image, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  if (image) {
    return (
      <img
        src={image}
        alt={username}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium flex-shrink-0`}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  );
}

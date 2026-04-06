'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { articleService } from '@/services/article.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ArticleResponse, CreateArticleRequest } from '@/types';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  subtitle: z.string().max(300, 'Subtitle must be less than 300 characters').optional(),
  body: z.string().min(1, 'Body is required'),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  article?: ArticleResponse;
  isEdit?: boolean;
}

export function ArticleForm({ article, isEdit = false }: ArticleFormProps) {
  const [tags, setTags] = useState<string[]>(article?.tags.map((t) => t.name) || []);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || '',
      subtitle: article?.subtitle || '',
      body: article?.body || '',
    },
  });

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload: CreateArticleRequest = {
        title: data.title,
        subtitle: data.subtitle,
        body: data.body,
        tags,
      };

      if (isEdit && article) {
        await articleService.update(article.slug, payload);
        toast.success('Article updated successfully');
        router.push(`/articles/${article.slug}`);
      } else {
        const newArticle = await articleService.create(payload);
        toast.success('Article published successfully');
        router.push(`/articles/${newArticle.slug}`);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save article';
      setError(errorMsg);
      toast.error('Failed to save article', errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Enter article title..."
          {...register('title')}
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          placeholder="Optional subtitle..."
          {...register('subtitle')}
          className={errors.subtitle ? 'border-destructive' : ''}
        />
        {errors.subtitle && (
          <p className="text-sm text-destructive">{errors.subtitle.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Body *</Label>
        <Textarea
          id="body"
          placeholder="Write your article content (Markdown supported)..."
          {...register('body')}
          className={`min-h-[400px] font-mono ${errors.body ? 'border-destructive' : ''}`}
        />
        {errors.body && (
          <p className="text-sm text-destructive">{errors.body.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Supports Markdown formatting
        </p>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAddTag}
            disabled={tags.length >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {tags.length}/10 tags • Press Enter to add
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Article' : 'Publish Article'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

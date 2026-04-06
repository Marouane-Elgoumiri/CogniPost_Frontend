'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { interactionService } from '@/services/interaction.service';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LikeButtonProps {
  slug: string;
  initialLiked: boolean;
  initialCount: number;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ slug, initialLiked, initialCount, size = 'md' }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const sizeClasses = {
    sm: 'h-8 px-2.5 text-xs gap-1',
    md: 'h-9 px-3 text-sm gap-1.5',
    lg: 'h-10 px-4 text-base gap-2',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleClick = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    const optimisticLiked = !liked;
    const optimisticCount = optimisticLiked ? count + 1 : count - 1;

    setLiked(optimisticLiked);
    setCount(optimisticCount);

  try {
    const result = await interactionService.toggleLike(slug);
    setLiked(result.action);
    setCount(result.count);
    toast.success(result.action ? 'Article liked' : 'Article unliked');
    router.refresh();
  } catch {
    setLiked(liked);
    setCount(count);
    toast.error('Failed to update like');
  } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={liked ? 'default' : 'outline'}
      size="sm"
      className={`${sizeClasses[size]} ${liked ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''} transition-all`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Heart className={`${iconSizes[size]} ${liked ? 'fill-current' : ''}`} />
      <span>{count}</span>
    </Button>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { interactionService } from '@/services/interaction.service';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
  slug: string;
  initialBookmarked: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BookmarkButton({ slug, initialBookmarked, size = 'md' }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const sizeClasses = {
    sm: 'h-8 w-8 p-0',
    md: 'h-9 w-9 p-0',
    lg: 'h-10 w-10 p-0',
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
    const optimisticBookmarked = !bookmarked;
    setBookmarked(optimisticBookmarked);

    try {
      await interactionService.toggleBookmark(slug);
      router.refresh();
    } catch {
      setBookmarked(bookmarked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={bookmarked ? 'default' : 'outline'}
      size="sm"
      className={`${sizeClasses[size]} ${bookmarked ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' : ''} transition-all`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Bookmark className={`${iconSizes[size]} ${bookmarked ? 'fill-current' : ''}`} />
    </Button>
  );
}

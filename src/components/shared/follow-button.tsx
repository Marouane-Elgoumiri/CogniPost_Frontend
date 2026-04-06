'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { followService } from '@/services/follow.service';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck } from 'lucide-react';

interface FollowButtonProps {
  userId: number;
  initialFollowing: boolean;
  initialCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function FollowButton({ userId, initialFollowing, initialCount, size = 'md' }: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [count, setCount] = useState(initialCount ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const sizeClasses = {
    sm: 'h-7 px-2.5 text-xs gap-1',
    md: 'h-8 px-3 text-sm gap-1.5',
    lg: 'h-9 px-4 text-base gap-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleClick = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.id === userId) return;

    setIsLoading(true);
    const optimisticFollowing = !following;
    const optimisticCount = optimisticFollowing ? count + 1 : count - 1;

    setFollowing(optimisticFollowing);
    setCount(optimisticCount);

    try {
      const result = await followService.toggleFollow(userId);
      setFollowing(result.following);
      setCount(result.count);
      router.refresh();
    } catch {
      setFollowing(following);
      setCount(count);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={following ? 'outline' : 'default'}
      size="sm"
      className={`${sizeClasses[size]} ${following ? 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950' : ''} transition-all`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {following ? (
        <>
          <UserCheck className={iconSizes[size]} />
          <span>Following</span>
          {initialCount !== undefined && <span>({count})</span>}
        </>
      ) : (
        <>
          <UserPlus className={iconSizes[size]} />
          <span>Follow</span>
          {initialCount !== undefined && count > 0 && <span>({count})</span>}
        </>
      )}
    </Button>
  );
}

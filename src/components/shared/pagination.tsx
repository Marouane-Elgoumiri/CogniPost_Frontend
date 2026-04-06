import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({ page, totalPages, basePath = '/articles' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible + 2) {
    for (let i = 0; i < totalPages; i++) pages.push(i);
  } else {
    pages.push(0);
    if (page > 2) pages.push('...');
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages - 2, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 3) pages.push('...');
    pages.push(totalPages - 1);
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      <Link
        href={`${basePath}?page=0`}
        className={cn(
          'flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors',
          page === 0 && 'pointer-events-none opacity-50'
        )}
        aria-disabled={page === 0}
        tabIndex={page === 0 ? -1 : undefined}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Link>

      <Link
        href={`${basePath}?page=${page - 1}`}
        className={cn(
          'flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors',
          page === 0 && 'pointer-events-none opacity-50'
        )}
        aria-disabled={page === 0}
        tabIndex={page === 0 ? -1 : undefined}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="flex items-center justify-center h-8 w-8 text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={`${basePath}?page=${p}`}
            className={cn(
              'flex items-center justify-center h-8 w-8 rounded-md text-sm font-medium transition-colors hover:bg-accent',
              p === page && 'bg-primary text-primary-foreground hover:bg-primary'
            )}
            aria-current={p === page ? 'page' : undefined}
          >
            {p + 1}
          </Link>
        )
      )}

      <Link
        href={`${basePath}?page=${page + 1}`}
        className={cn(
          'flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors',
          page >= totalPages - 1 && 'pointer-events-none opacity-50'
        )}
        aria-disabled={page >= totalPages - 1}
        tabIndex={page >= totalPages - 1 ? -1 : undefined}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>

      <Link
        href={`${basePath}?page=${totalPages - 1}`}
        className={cn(
          'flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors',
          page >= totalPages - 1 && 'pointer-events-none opacity-50'
        )}
        aria-disabled={page >= totalPages - 1}
        tabIndex={page >= totalPages - 1 ? -1 : undefined}
      >
        <ChevronsRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}

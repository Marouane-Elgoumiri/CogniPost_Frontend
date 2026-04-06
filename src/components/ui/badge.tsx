import * as React from 'react';

import { cn } from '@/lib/utils';

function Badge({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'span'> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-primary text-primary-foreground border-transparent': variant === 'default',
          'bg-secondary text-secondary-foreground border-transparent': variant === 'secondary',
          'bg-destructive text-destructive-foreground border-transparent': variant === 'destructive',
          'text-foreground': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };

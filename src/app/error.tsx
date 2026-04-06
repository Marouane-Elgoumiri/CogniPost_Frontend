'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant="outline" onClick={() => (window.location.href = '/')}>
              Go home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

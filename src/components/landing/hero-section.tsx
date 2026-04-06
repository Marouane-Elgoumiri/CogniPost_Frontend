'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Start building your blog now
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern blog platform for sharing ideas and knowledge. Just create and publish—no configuration required.
        </p>
        
        <div className="bg-muted/30 border rounded-lg p-6 text-left font-mono text-sm overflow-x-auto">
          <div className="text-muted-foreground mb-2">// Create an article</div>
          <div className="space-y-1">
            <span className="text-blue-600">await</span>{' '}
            <span className="text-foreground">articleService</span>
            <span className="text-foreground">.</span>
            <span className="text-purple-600">create</span>
            <span className="text-foreground">(</span>
            <span className="text-foreground">{`{`}</span>
          </div>
          <div className="pl-4">
            <span className="text-green-600">title:</span>{' '}
            <span className="text-amber-600">&quot;My First Post&quot;</span>
            <span className="text-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-green-600">body:</span>{' '}
            <span className="text-amber-600">&quot;# Hello World...&quot;</span>
          </div>
          <div>
            <span className="text-foreground">{`}`}</span>
            <span className="text-foreground">);</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="px-8">
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/articles">Browse articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

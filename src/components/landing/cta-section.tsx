import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to start writing?</h2>
        <p className="text-lg text-muted-foreground">
          Join our community of writers and share your ideas with the world.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="px-8">
            <Link href="/signup">Create your account</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/articles">Browse articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

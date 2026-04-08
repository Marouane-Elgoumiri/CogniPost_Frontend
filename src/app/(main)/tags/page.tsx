import { Metadata } from 'next';
import Link from 'next/link';
import { tagServerService } from '@/services/server/tag.server';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Tags | CogniPost',
  description: 'Browse all tags',
};

export default async function TagsPage() {
	let tags;
	try {
		tags = await tagServerService.getAll();
  } catch {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Tags</h1>
        <p className="text-center py-16 text-muted-foreground">Unable to load tags. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Tags</h1>
      {!tags?.length ? (
        <p className="text-center py-16 text-muted-foreground">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <Badge variant="outline" className="text-sm px-3 py-1 hover:bg-accent cursor-pointer">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

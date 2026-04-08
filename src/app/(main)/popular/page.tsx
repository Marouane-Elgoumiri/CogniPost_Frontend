import { Metadata } from 'next';
import { ArticleCard } from '@/components/articles/article-card';
import { articleServerService } from '@/services/server/article.server';

export const metadata: Metadata = {
	title: 'Popular Articles | CogniPost',
	description: 'Most viewed articles on CogniPost',
};

export default async function PopularPage() {
	let articles;
	try {
		articles = await articleServerService.getPopular();
  } catch {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Popular Articles</h1>
        <p className="text-center py-16 text-muted-foreground">Unable to load articles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Popular Articles</h1>
      {!articles?.length ? (
        <p className="text-center py-16 text-muted-foreground">No popular articles yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Metadata } from 'next';
import { ArticleCard } from '@/components/articles/article-card';
import { articleService } from '@/services/article.service';

export const metadata: Metadata = {
  title: 'Popular Articles | CogniPost',
  description: 'Most viewed articles on CogniPost',
};

export default async function PopularPage() {
  const articles = await articleService.getPopular();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Popular Articles</h1>
      {!articles.length ? (
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

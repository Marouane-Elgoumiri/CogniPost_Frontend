import { Metadata } from 'next';
import { ArticleForm } from '@/components/articles/article-form';

export const metadata: Metadata = {
  title: 'New Article | CogniPost',
  description: 'Create a new article',
};

export default function NewArticlePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">New Article</h1>
      <ArticleForm />
    </div>
  );
}

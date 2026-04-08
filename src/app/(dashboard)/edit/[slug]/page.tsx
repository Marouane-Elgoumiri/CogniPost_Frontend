import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articleServerService } from '@/services/server/article.server';
import { ArticleForm } from '@/components/articles/article-form';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: 'Edit Article | CogniPost',
		description: 'Edit your article',
	};
}

export default async function EditArticlePage({ params }: Props) {
	let article;
	try {
		article = await articleServerService.getArticleBySlug(params.slug);
	} catch {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-3xl">
			<h1 className="text-3xl font-bold tracking-tight mb-8">Edit Article</h1>
			<ArticleForm article={article} isEdit />
		</div>
	);
}

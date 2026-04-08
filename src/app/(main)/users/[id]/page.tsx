import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { userServerService } from '@/services/server/user.server';
import { articleServerService } from '@/services/server/article.server';
import { ArticleCard } from '@/components/articles/article-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FollowButton } from '@/components/shared/follow-button';
import { Suspense } from 'react';
import { FileText, Users, Calendar } from 'lucide-react';
import type { ArticleResponse } from '@/types';

type Props = {
	params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const user = await userServerService.getById(parseInt(params.id, 10));
		return {
			title: `${user.username} | CogniPost`,
			description: user.bio || `Profile of ${user.username}`,
		};
	} catch {
		return { title: 'User Not Found | CogniPost' };
	}
}

async function UserArticles({ userId }: { userId: number }) {
	let articles: ArticleResponse[] = [];
	try {
		const data = await articleServerService.search({ author: String(userId), size: 12 });
		articles = data?.content || [];
	} catch {
		return (
			<p className="text-center py-8 text-muted-foreground">
				Unable to load articles
			</p>
		);
	}

	if (!articles.length) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				<FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
				<p>No published articles yet</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
}

function UserArticlesSkeleton() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="space-y-3">
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-1/3" />
				</div>
			))}
		</div>
	);
}

export default async function UserProfilePage({ params }: Props) {
	const userId = parseInt(params.id, 10);

	if (isNaN(userId)) {
		notFound();
	}

	let user;
	try {
		user = await userServerService.getById(userId);
	} catch {
		notFound();
	}

	const formattedDate = new Date(user.id).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				{/* Profile Header */}
				<div className="bg-card border rounded-lg p-6 mb-8">
					<div className="flex flex-col md:flex-row items-start gap-6">
						{/* Avatar */}
						<div className="flex-shrink-0">
							{user.image ? (
								<img
									src={user.image}
									alt={user.username}
									className="w-24 h-24 rounded-full object-cover border-2"
								/>
							) : (
								<div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold">
									{user.username.charAt(0).toUpperCase()}
								</div>
							)}
						</div>

						{/* Info */}
						<div className="flex-1 min-w-0">
							<h1 className="text-2xl font-bold mb-2">{user.username}</h1>

							{user.bio && (
								<p className="text-muted-foreground mb-4">{user.bio}</p>
							)}

							<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
								<span className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									{user.followerCount} followers
								</span>
								<span className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									{user.followingCount} following
								</span>
							</div>

							<div className="flex gap-2">
								<FollowButton
									userId={user.id}
									initialFollowing={false}
									initialCount={user.followerCount}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Articles Section */}
				<div>
					<h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Published Articles
					</h2>

					<Suspense fallback={<UserArticlesSkeleton />}>
						<UserArticles userId={userId} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}

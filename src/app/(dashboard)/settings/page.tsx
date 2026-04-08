'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { userService } from '@/services/user.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
	bio: z.string().max(500, 'Bio must be less than 500 characters').optional().or(z.literal('')),
	image: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
	const { user, setUser } = useAuth();
	const router = useRouter();
	const toast = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			bio: user?.bio || '',
			image: user?.image || '',
		},
	});

	useEffect(() => {
		if (user) {
			reset({
				bio: user.bio || '',
				image: user.image || '',
			});
		}
	}, [user, reset]);

	const onSubmit = async (data: ProfileFormData) => {
		setIsSubmitting(true);
		setError(null);

		try {
			const updatedUser = await userService.updateProfile({
				bio: data.bio || undefined,
				image: data.image || undefined,
			});
			setUser(updatedUser);
			toast.success('Profile updated successfully');
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : 'Failed to update profile';
			setError(errorMsg);
			toast.error('Failed to update profile', errorMsg);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground">
					Manage your account settings and profile
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<User className="h-5 w-5" />
						Profile
					</CardTitle>
					<CardDescription>
						Update your public profile information
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								value={user?.username || ''}
								disabled
								className="bg-muted"
							/>
							<p className="text-xs text-muted-foreground">
								Username cannot be changed
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={user?.email || ''}
								disabled
								className="bg-muted"
							/>
							<p className="text-xs text-muted-foreground">
								Email cannot be changed
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								{...register('bio')}
								className={errors.bio ? 'border-destructive' : ''}
								rows={4}
							/>
							{errors.bio && (
								<p className="text-sm text-destructive">{errors.bio.message}</p>
							)}
							<p className="text-xs text-muted-foreground">
								Brief description for your profile. Max 500 characters.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="image">Profile Image URL</Label>
							<Input
								id="image"
								type="url"
								placeholder="https://example.com/avatar.jpg"
								{...register('image')}
								className={errors.image ? 'border-destructive' : ''}
							/>
							{errors.image && (
								<p className="text-sm text-destructive">{errors.image.message}</p>
							)}
						</div>

						{error && (
							<div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
								{error}
							</div>
						)}

						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Save Changes
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

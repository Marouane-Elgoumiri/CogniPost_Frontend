import { cookies } from 'next/headers';
import { API_URL } from './constants';

export class ServerApiError extends Error {
	status: number;
	details?: Record<string, string[]> | string;

	constructor(message: string, status: number, details?: Record<string, string[]> | string) {
		super(message);
		this.name = 'ServerApiError';
		this.status = status;
		this.details = details;
	}
}

interface ServerFetchOptions extends Omit<RequestInit, 'headers'> {
	requireAuth?: boolean;
	headers?: Record<string, string>;
}

export async function serverFetch<T>(
	endpoint: string,
	options: ServerFetchOptions = {}
): Promise<T> {
	const { requireAuth = false, headers: customHeaders, ...fetchOptions } = options;
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value;

	if (requireAuth && !accessToken) {
		throw new ServerApiError('Unauthorized', 401);
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...customHeaders,
	};

	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const res = await fetch(`${API_URL}${endpoint}`, {
		...fetchOptions,
		headers,
	});

	if (res.status === 204) {
		return undefined as T;
	}

	if (!res.ok) {
		let errorData;
		try {
			errorData = await res.json();
		} catch {
			errorData = { message: 'An unexpected error occurred', status: res.status };
		}
		throw new ServerApiError(
			errorData.message || 'Request failed',
			res.status,
			errorData.details
		);
	}

	const json = await res.json();
	return json.data ?? json;
}

export const serverApi = {
	get<T>(endpoint: string, options?: Omit<ServerFetchOptions, 'body' | 'method'>) {
		return serverFetch<T>(endpoint, { ...options, method: 'GET' });
	},

	post<T>(endpoint: string, body?: unknown, options?: Omit<ServerFetchOptions, 'body' | 'method'>) {
		return serverFetch<T>(endpoint, {
			...options,
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined,
		});
	},

	put<T>(endpoint: string, body?: unknown, options?: Omit<ServerFetchOptions, 'body' | 'method'>) {
		return serverFetch<T>(endpoint, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined,
		});
	},

	delete<T>(endpoint: string, options?: Omit<ServerFetchOptions, 'body' | 'method'>) {
		return serverFetch<T>(endpoint, { ...options, method: 'DELETE' });
	},
};

import { API_URL } from './constants';
import type { UserResponse } from '@/types';

export async function getMe(): Promise<UserResponse | null> {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

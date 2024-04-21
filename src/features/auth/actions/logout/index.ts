'use server';

import { signOut } from '@/lib/next-auth/auth';

export async function logout() {
  try {
    await signOut({
      redirectTo: '/',
    });
  } catch (error) {
    throw error;
  }
}

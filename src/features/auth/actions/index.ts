'use server';

import { ERROR_MESSAGES } from '@/config/errors';
import { signIn } from '@/lib/next-auth/auth';

export async function githubLogin() {
  try {
    await signIn('github', {
      redirectTo: '/',
    });
  } catch {
    return { messages: [ERROR_MESSAGES.GITHUB_AUTH_ERROR] };
  }
}

'use server';

import { signIn } from '@/lib/next-auth/auth';

export async function githubLogin() {
  await signIn('github', {
    redirectTo: '/',
  });
}

'use client';

import { signIn } from 'next-auth/react';

export const GithubLoginButton = () => {
  return (
    <button
      onClick={async () => {
        try {
          await signIn('github', { callbackUrl: '/' });
        } catch (error) {
          console.log({ error });
        }
      }}
    >
      GitHub
    </button>
  );
};

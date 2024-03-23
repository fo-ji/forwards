'use client';

import { signIn } from 'next-auth/react';

export const MailLoginButton = () => {
  return (
    <button
      onClick={async () => {
        try {
          await signIn('credentials', {
            email: 'user1@example.com',
            password: 'Test12345!',
            callbackUrl: '/',
          });
        } catch (error) {
          console.log({ error });
        }
      }}
    >
      Mail
    </button>
  );
};

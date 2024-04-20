import NextAuth from 'next-auth';

import { authConfig } from './lib/next-auth/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/((?!login|register|entry|api|_next/static|_next/image|favicon.ico).*)',
  ],
};

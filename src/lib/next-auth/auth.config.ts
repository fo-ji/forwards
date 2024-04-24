import { IS_DEVELOPMENT } from '../../config/constants';

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  debug: IS_DEVELOPMENT,
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

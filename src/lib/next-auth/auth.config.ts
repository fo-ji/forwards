import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import { IS_DEVELOPMENT } from '../../config/constants';
import { loginSchema } from '../../features/auth/schemas/login';
import prisma from '../prisma';

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  debug: IS_DEVELOPMENT,
  pages: {
    signIn: '/login',
  },
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
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          return await prisma.user.findUnique({
            where: {
              ...parsedCredentials.data,
            },
          });
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

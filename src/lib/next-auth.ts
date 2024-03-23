import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

import { IS_DEVELOPMENT } from '@/config/constants';
import { env } from '@/env.mjs';

import prisma from './prisma';

import type { NextAuthOptions } from 'next-auth';

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  debug: IS_DEVELOPMENT,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          return await prisma.user.findUnique({
            where: {
              email: credentials.email,
              password: credentials.password,
            },
          });
        } catch (error) {
          return null;
        }
      },
    }),
  ],
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
  },
  pages: {
    signIn: '/login',
  },
};

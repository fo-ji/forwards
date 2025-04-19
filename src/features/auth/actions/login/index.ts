'use server';

import { parseWithZod } from '@conform-to/zod';
import { AuthError } from 'next-auth';

import { ERROR_MESSAGES } from '@/config/errors';
import { signIn } from '@/lib/next-auth/auth';

import { loginSchema } from '../../schemas/login';

export async function credentialsLogin(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await signIn('credentials', { ...submission.value, redirect: false });
    return submission.reply();
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return submission.reply({
            formErrors: [ERROR_MESSAGES.INCORRECT_EMAIL_PASSWORD],
          });
        default:
          return submission.reply({
            formErrors: [ERROR_MESSAGES.INTERNAL_SEVER_ERROR],
          });
      }
    }
    throw error;
  }
}

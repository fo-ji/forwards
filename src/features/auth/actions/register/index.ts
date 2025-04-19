'use server';

import { parseWithZod } from '@conform-to/zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthError } from 'next-auth';

import { ERROR_MESSAGES } from '@/config/errors';
import { signIn } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { registerSchema } from '../../schemas/register';

export async function credentialsRegister(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: submission.value.email,
        password: submission.value.password,
      },
      select: {
        email: true,
        password: true,
      },
    });
    await signIn('credentials', {
      ...user,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return submission.reply({
          formErrors: [ERROR_MESSAGES.FAILED_UNIQUE_CONSTRAINT_EMAIL],
        });
      }
    }
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

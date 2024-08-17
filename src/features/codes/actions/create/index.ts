'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { createCodeSchema } from '../../schemas/create';

export async function createCode(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createCodeSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }
  const session = await auth();
  if (!session) {
    return submission.reply({
      formErrors: [ERROR_MESSAGES.UNAUTHORIZED_USER],
    });
  }

  try {
    await prisma.code.create({
      data: submission.value,
    });
    revalidatePath(`/api/skills/${submission.value.skillId}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

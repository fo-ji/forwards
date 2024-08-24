'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { deleteCodeSchema } from '../../schemas/delete';

export async function deleteCode(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: deleteCodeSchema,
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
    const code = await prisma.code.delete({
      where: {
        id: submission.value.id,
      },
    });
    revalidatePath(`/api/skills/${code.skillId}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { deleteProjectSchema } from '../../schemas/delete';

export async function deleteProject(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: deleteProjectSchema,
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
    await prisma.project.delete({
      where: {
        id: submission.value.id,
        userId: session.user.id,
      },
    });
    revalidatePath('/api/projects');
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

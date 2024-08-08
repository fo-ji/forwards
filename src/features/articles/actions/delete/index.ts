'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { deleteArticleSchema } from '../../schemas/delete';

export async function deleteArticle(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: deleteArticleSchema,
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
    const article = await prisma.article.delete({
      where: {
        id: submission.value.id,
      },
    });
    revalidatePath(`/api/skills/${article.skillId}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

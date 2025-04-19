'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { editArticleSchema } from '../../schemas/edit';

export async function editArticle(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: editArticleSchema,
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
    const article = await prisma.article.update({
      where: {
        id: submission.value.id,
      },
      data: {
        name: submission.value.name,
        url: submission.value.url,
      },
    });
    revalidatePath(`/api/skills/${article.skillId}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

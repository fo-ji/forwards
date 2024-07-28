'use server';

// import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { createArticleSchema } from '../../schemas/create';

export async function createArticle(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createArticleSchema,
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
    await prisma.article.create({
      data: submission.value,
    });
    // revalidatePath('/api/skills'); // todo キャッシュがそもそも効いてないので、見直し
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

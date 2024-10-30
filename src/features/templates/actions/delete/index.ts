'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { deleteTemplateSchema } from '../../schemas/delete';

export async function deleteTemplate(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: deleteTemplateSchema,
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
    await prisma.template.delete({
      where: {
        id: submission.value.id,
        userId: session.user.id,
      },
    });
    revalidatePath('/api/templates');
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { deleteSKillSchema } from '../../schemas/delete';

export async function deleteSkill(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: deleteSKillSchema,
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
    await prisma.skill.delete({
      where: {
        id: submission.value.id,
        userId: session.user.id,
      },
    });
    revalidatePath('/api/skills');
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

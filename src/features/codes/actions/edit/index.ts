'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { editCodeSchema } from '../../schemas/edit';

export async function editCode(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: editCodeSchema,
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
    const code = await prisma.code.update({
      where: {
        id: submission.value.id,
      },
      data: {
        name: submission.value.name,
        block: submission.value.block,
      },
    });
    revalidatePath(`/api/skills/${code.skillId}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

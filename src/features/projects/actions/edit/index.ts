'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { editProjectSchema } from '../../schemas/edit';

export async function editProject(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: editProjectSchema,
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
  const { id, skillIds, ...values } = submission.value;

  try {
    await prisma.project.update({
      where: {
        id: submission.value.id,
      },
      data: {
        ...values,
        userId: session.user.id,
        skills: {
          set: skillIds?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath(`/api/projects/${id}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

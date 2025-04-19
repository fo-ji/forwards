'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { editTemplateSchema } from '../../schemas/edit';

export async function editTemplate(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: editTemplateSchema,
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
    await prisma.template.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        ...values,
        userId: session.user.id,
        skills: {
          set: skillIds?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath(`/api/templates/${id}`);
    return submission.reply();
  } catch (error) {
    throw error;
  }
}

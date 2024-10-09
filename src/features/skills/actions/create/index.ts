'use server';

import { revalidatePath } from 'next/cache';

import { parseWithZod } from '@conform-to/zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ERROR_MESSAGES } from '@/config/errors';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

import { createSKillSchema } from '../../schemas/create';

export async function createSkill(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createSKillSchema,
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

  const { projectIds, ...values } = submission.value;

  try {
    await prisma.skill.create({
      data: {
        ...values,
        userId: session.user.id,
        projects: {
          connect: projectIds?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath('/api/skills');
    return submission.reply();
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return submission.reply({
        formErrors: [ERROR_MESSAGES.FAILED_UNIQUE_CONSTRAINT_SKILL],
      });
    }
    throw error;
  }
}

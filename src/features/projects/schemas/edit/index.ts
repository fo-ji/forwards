import { Status } from '@prisma/client';
import { z } from 'zod';

export const editProjectSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string({ required_error: '必須項目です' })
    .max(255, { message: '255文字以内で入力してください' }),
  status: z.nativeEnum(Status, { required_error: '必須項目です' }),
  skillIds: z.string().cuid().array().optional().default([]),
  url: z
    .string()
    .max(2000, { message: '2000文字以内で入力してください' })
    .url({ message: 'URLの形式で入力してください' })
    .optional()
    .nullable()
    .default(null),
  installation: z
    .string()
    .max(3000, { message: '3000文字以内で入力してください' })
    .optional()
    .nullable()
    .default(null),
});

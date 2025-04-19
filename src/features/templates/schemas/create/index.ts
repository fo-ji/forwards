import { z } from 'zod';

export const createTemplateSchema = z.object({
  name: z
    .string({ required_error: '必須項目です' })
    .max(255, { message: '255文字以内で入力してください' }),
  skillIds: z.string().cuid().array().optional(),
  installation: z
    .string()
    .max(3000, { message: '3000文字以内で入力してください' })
    .optional(),
});

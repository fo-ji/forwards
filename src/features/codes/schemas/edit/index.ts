import { z } from 'zod';

export const editCodeSchema = z.object({
  id: z.string().cuid(),
  name: z
    .string({ required_error: '必須項目です' })
    .max(255, { message: '255文字以内で入力してください' }),
  block: z
    .string({ required_error: '必須項目です' })
    .max(2000, { message: '2000文字以内で入力してください' }),
});

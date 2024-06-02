import { z } from 'zod';

export const editSKillSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: '必須項目です' })
    .max(255, { message: '255文字以内で入力してください' }),
  url: z
    .string({ required_error: '必須項目です' })
    .max(2000, { message: '2000文字以内で入力してください' })
    .url({ message: 'URLの形式で入力してください' }),
});

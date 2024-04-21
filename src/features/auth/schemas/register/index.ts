import { z } from 'zod';

import { PASSWORD_REGEX } from '../../constants';

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: '必須項目です' })
      .max(255, { message: '255文字以内で入力してください' })
      .email({ message: 'メールアドレスの形式で入力してください' }),
    password: z
      .string({ required_error: '必須項目です' })
      .min(6, { message: '6文字以上で入力してください' })
      .max(24, { message: '24文字以内で入力してください' })
      .regex(PASSWORD_REGEX, '半角英字(大・小)、数字、記号を含めてください'),
    passwordConfirm: z
      .string({ required_error: '必須項目です' })
      .min(6, { message: '6文字以上で入力してください' })
      .max(24, { message: '24文字以内で入力してください' })
      .regex(PASSWORD_REGEX, '半角英字(大・小)、数字、記号を含めてください'),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'パスワードとパスワード（確認）が一致しません',
    path: ['passwordConfirm'],
  });

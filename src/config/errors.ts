export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const isErrorCode = (code: unknown): code is ErrorCode => {
  return typeof code === 'string' && code in ErrorCode;
};

export const ErrorCode = {
  INCORRECT_EMAIL_PASSWORD: 'INCORRECT_EMAIL_PASSWORD',
  INTERNAL_SEVER_ERROR: 'INTERNAL_SEVER_ERROR',
} as const;

export const ERROR_MESSAGES: Record<keyof typeof ErrorCode, string> = {
  [ErrorCode.INCORRECT_EMAIL_PASSWORD]:
    'メールアドレスかパスワードが間違っています',
  [ErrorCode.INTERNAL_SEVER_ERROR]: 'システムエラーが発生しました',
};

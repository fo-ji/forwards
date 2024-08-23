import { http } from '@/lib/http';

import type { Code } from '@prisma/client';

type GetCodeParams = {
  id: string;
};

export const getCode = ({ id }: GetCodeParams) => {
  return http<Code>(`/api/codes/${id}`);
};

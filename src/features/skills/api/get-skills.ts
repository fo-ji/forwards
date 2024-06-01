import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { Skill } from '@prisma/client';

type GetSkillsParams = {
  page?: number;
  pageSize?: number;
};

export const getSkills = ({ page, pageSize }: GetSkillsParams) => {
  const url = generateQueryURL('/api/skills', { page, pageSize });
  return http<Skill[]>(url);
};

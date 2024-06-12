import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsSkillsListType } from '../schemas/get';
import type { Skill } from '@prisma/client';

export const getSkills = (searchParams: SearchParamsSkillsListType) => {
  const url = generateQueryURL('/api/skills', searchParams);
  return http<Skill[]>(url);
};

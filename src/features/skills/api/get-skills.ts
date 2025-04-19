import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsSkillsListType } from '../schemas/get';
import type { SkillWithProjects } from '../types';

export const getSkills = (searchParams: SearchParamsSkillsListType) => {
  const url = generateQueryURL('/api/skills', searchParams);
  return http<SkillWithProjects[]>(url);
};

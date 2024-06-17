import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsSkillsCountType } from '../schemas/get';

export const getSkillsCount = (searchParams: SearchParamsSkillsCountType) => {
  const url = generateQueryURL('/api/skills/count', searchParams);
  return http<number>(url);
};

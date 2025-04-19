import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsProjectsCountType } from '../schemas/get';

export const getProjectsCount = (
  searchParams: SearchParamsProjectsCountType,
) => {
  const url = generateQueryURL('/api/projects/count', searchParams);
  return http<number>(url);
};

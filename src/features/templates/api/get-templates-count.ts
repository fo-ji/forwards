import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsTemplatesCountType } from '../schemas/get';

export const getTemplatesCount = (
  searchParams: SearchParamsTemplatesCountType,
) => {
  const url = generateQueryURL('/api/templates/count', searchParams);
  return http<number>(url);
};

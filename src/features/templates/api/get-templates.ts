import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsTemplatesListType } from '../schemas/get';
import type { TemplateWithRelations } from '../types';

export const getTemplates = (searchParams: SearchParamsTemplatesListType) => {
  const url = generateQueryURL('/api/templates', searchParams);
  return http<TemplateWithRelations[]>(url);
};

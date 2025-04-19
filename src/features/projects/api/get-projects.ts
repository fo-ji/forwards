import { http } from '@/lib/http';
import { generateQueryURL } from '@/utils/generate-query-url';

import type { SearchParamsProjectsListType } from '../schemas/get';
import type { ProjectWithRelations } from '../types';

export const getProjects = (searchParams: SearchParamsProjectsListType) => {
  const url = generateQueryURL('/api/projects', searchParams);
  return http<ProjectWithRelations[]>(url);
};

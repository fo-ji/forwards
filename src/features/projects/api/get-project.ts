import { http } from '@/lib/http';

import type { ProjectWithRelations } from '../types';

type GetProjectParams = {
  id: string;
};

export const getProject = ({ id }: GetProjectParams) => {
  return http<ProjectWithRelations>(`/api/projects/${id}`);
};

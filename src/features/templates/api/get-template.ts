import { http } from '@/lib/http';

import type { TemplateWithRelations } from '../types';

type GetTemplateParams = {
  id: string;
};

export const getTemplate = ({ id }: GetTemplateParams) => {
  return http<TemplateWithRelations>(`/api/templates/${id}`);
};

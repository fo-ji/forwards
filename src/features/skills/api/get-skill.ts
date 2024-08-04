import { http } from '@/lib/http';

import type { SkillWithRelations } from '../types';

type GetSkillParams = {
  id: string;
};

export const getSkill = ({ id }: GetSkillParams) => {
  return http<SkillWithRelations>(`/api/skills/${id}`);
};

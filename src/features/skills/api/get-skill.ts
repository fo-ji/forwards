import { http } from '@/lib/http';

import type { Skill } from '@prisma/client';

type GetSkillParams = {
  id: string;
};

export const getSkill = ({ id }: GetSkillParams) => {
  return http<Skill>(`/api/skills/${id}`);
};

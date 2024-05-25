import { http } from '@/lib/http';

import type { Skill } from '@prisma/client';

export const getSkills = () => {
  return http<Skill[]>('/api/skills');
};

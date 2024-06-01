import { http } from '@/lib/http';

export const getSkillsCount = () => {
  return http<number>('/api/skills/count');
};

import { http } from '@/lib/http';
import { SelectOptions } from '@/types';

export const getSkillOptions = () => {
  return http<SelectOptions>('/api/skills/options');
};

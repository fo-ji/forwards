import { http } from '@/lib/http';
import type { SelectOptions } from '@/types';

export const getProjectOptions = () => {
  return http<SelectOptions>('/api/projects/options');
};

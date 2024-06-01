import { z } from 'zod';

export const searchParamsSkillsListSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});

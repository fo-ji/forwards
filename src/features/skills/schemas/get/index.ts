import { z } from 'zod';

import { SortDirection } from '@/types';

export const searchParamsSkillsListSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  orderBy: z.enum(['name', 'updatedAt']).default('updatedAt'),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.DESC),
});

export type SearchParamsSkillsListType = z.infer<
  typeof searchParamsSkillsListSchema
>;

export const paramsSkillSchema = z.object({
  sid: z.string().cuid(),
});

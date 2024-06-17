import { z } from 'zod';

import { type PageSearchParams, SortDirection } from '@/types';

export const searchParamsSkillsListSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  orderBy: z.enum(['name', 'updatedAt']).default('updatedAt'),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.DESC),
  name: z.string().max(255).optional(),
});

export type SearchParamsSkillsListType = z.infer<
  typeof searchParamsSkillsListSchema
>;

export const searchParamsSkillsCountSchema = z.object({
  name: z.string().max(255).optional(),
});

export type SearchParamsSkillsCountType = z.infer<
  typeof searchParamsSkillsCountSchema
>;

export const paramsSkillSchema = z.object({
  sid: z.string().cuid(),
});

export type SkillsListPageParams = {
  name?: string;
} & PageSearchParams;

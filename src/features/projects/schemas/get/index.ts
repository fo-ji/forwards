import { z } from 'zod';

import { type PageSearchParams, SortDirection } from '@/types';

export const searchParamsProjectsListSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  orderBy: z.enum(['name', 'updatedAt', 'status']).default('updatedAt'),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.DESC),
  name: z.string().max(255).optional(),
});

export type SearchParamsProjectsListType = z.infer<
  typeof searchParamsProjectsListSchema
>;

export const searchParamsProjectsCountSchema = z.object({
  name: z.string().max(255).optional(),
});

export type SearchParamsProjectsCountType = z.infer<
  typeof searchParamsProjectsCountSchema
>;

export const paramsProjectSchema = z.object({
  pid: z.string().cuid(),
});

export type ProjectsListPageParams = {
  name?: string;
} & PageSearchParams;

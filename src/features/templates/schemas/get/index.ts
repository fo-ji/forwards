import { z } from 'zod';

import { type PageSearchParams, SortDirection } from '@/types';

export const searchParamsTemplatesListSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  orderBy: z.enum(['name', 'updatedAt']).default('updatedAt'),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.DESC),
  name: z.string().max(255).optional(),
});

export type SearchParamsTemplatesListType = z.infer<
  typeof searchParamsTemplatesListSchema
>;

export const searchParamsTemplatesCountSchema = z.object({
  name: z.string().max(255).optional(),
});

export type SearchParamsTemplatesCountType = z.infer<
  typeof searchParamsTemplatesCountSchema
>;

export const paramsTemplateSchema = z.object({
  tid: z.string().cuid(),
});

export type TemplatesListPageParams = {
  name?: string;
} & PageSearchParams;

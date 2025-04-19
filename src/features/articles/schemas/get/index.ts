import { z } from 'zod';

export const paramsArticleSchema = z.object({
  aid: z.string().cuid(),
});

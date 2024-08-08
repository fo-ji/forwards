import { z } from 'zod';

export const deleteArticleSchema = z.object({
  id: z.string().cuid(),
});

import { z } from 'zod';

export const deleteTemplateSchema = z.object({
  id: z.string().cuid(),
});

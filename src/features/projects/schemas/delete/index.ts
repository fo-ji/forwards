import { z } from 'zod';

export const deleteProjectSchema = z.object({
  id: z.string().cuid(),
});

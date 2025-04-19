import { z } from 'zod';

export const deleteSKillSchema = z.object({
  id: z.string().cuid(),
});

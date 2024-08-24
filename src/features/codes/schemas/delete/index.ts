import { z } from 'zod';

export const deleteCodeSchema = z.object({
  id: z.string().cuid(),
});

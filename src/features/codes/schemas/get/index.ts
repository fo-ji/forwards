import { z } from 'zod';

export const paramsCodeSchema = z.object({
  cid: z.string().cuid(),
});

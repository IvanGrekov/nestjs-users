import { z } from 'zod';

export const editUserSchema = z
  .object({
    name: z.string().min(1).max(255),
  })
  .partial();

export type TEditUserDto = z.infer<typeof editUserSchema>;

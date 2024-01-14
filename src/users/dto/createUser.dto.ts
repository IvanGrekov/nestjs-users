import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(1).max(255),
  })
  .required();

export type TCreateUserDto = z.infer<typeof createUserSchema>;

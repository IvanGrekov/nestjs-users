import { UUID } from 'crypto';

export type TUser = {
  id: UUID;
  name: string;
};

export type TUserId = TUser['id'];

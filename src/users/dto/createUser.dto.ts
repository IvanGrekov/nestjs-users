import { TUser } from '../entities/user.entity';

export class CreateUserDto {
  name: TUser['name'];
}

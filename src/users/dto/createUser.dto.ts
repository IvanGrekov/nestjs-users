import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Name must be a string',
  })
  @MinLength(1, {
    message: 'Name is too short',
  })
  @MaxLength(255, {
    message: 'Name is too long',
  })
  name: string;
}

import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class EditUserDto {
  @IsString({
    message: 'Name must be a string',
  })
  @MinLength(1, {
    message: 'Name is too short',
  })
  @MaxLength(255, {
    message: 'Name is too long',
  })
  @IsOptional()
  name?: string;
}

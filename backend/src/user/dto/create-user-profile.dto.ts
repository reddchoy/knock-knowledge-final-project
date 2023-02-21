import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  gender: string;

  dateOfBirth: Date;

  @Transform(({ value }) => parseInt(value))
  categoryId?: number;
}

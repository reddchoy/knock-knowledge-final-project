import { IsString } from 'class-validator';

export class EditUserProfileDto {
  @IsString()
  username: string;

  description?: string;

}

export class ResetUserPassword {
  @IsString()
  password: string
}
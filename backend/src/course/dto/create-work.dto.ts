import { IsString } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  content?: string;

  workImage?: string;
}

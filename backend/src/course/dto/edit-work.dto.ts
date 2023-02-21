import { IsString } from 'class-validator';

export class EditWorkDto {
  @IsString()
  content?: string;

  workImage?: string;
}

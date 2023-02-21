import { ArticleStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditArticleDto {
  status: ArticleStatus;

  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  content?: string;
}

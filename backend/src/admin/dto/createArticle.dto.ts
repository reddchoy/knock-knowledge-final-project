import { ArticleStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  content?: string;

}
import { IsNumber, IsString } from 'class-validator';

export class EditReviewDto {
  @IsString()
  content?: string;

  @IsNumber()
  courseRating?: number;
}

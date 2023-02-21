import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  content: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  courseRating: number;
}

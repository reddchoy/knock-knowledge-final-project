import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToShoppingCartDto {

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()    
  @IsNumber()
  userId: number;
  
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}

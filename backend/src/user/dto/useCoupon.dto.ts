import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CouponDto {
  promocode: string;
}

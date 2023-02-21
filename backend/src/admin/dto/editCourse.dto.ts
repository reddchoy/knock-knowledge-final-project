import { CoursesStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditCourseDto {
    status: CoursesStatus;

    @IsNotEmpty()
    @IsString()
    name: string;
  
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    sellingPrice: number;
  
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    courseTotalDuration: number;
  
    @IsNotEmpty()
    @IsString()
    longDescription: string;
  
    @IsNotEmpty()
    @IsString()
    shortDescription: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    catrgoryId: number
  }
import { CoursesStatus, SectionContentType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class EditChapterDto {
  @Transform(({ value }) => parseInt(value))
  courseId: number;

  @IsString()
  chapterName?: string;

  @Transform(({ value }) => parseInt(value))
  chapterOrderNum: number;
}

export class EditSectionDto {
  @Transform(({ value }) => parseInt(value))
  chapterId?: number;

  @IsString()
  sectionName?: string;

  @Transform(({ value }) => parseInt(value))
  sectionOrderNum?: number;

  contentType?: SectionContentType;

  content?: string;

  isLocked?: boolean;
}

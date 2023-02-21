import { S3Module } from './../aws-s3/s3.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [PrismaModule, S3Module],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}

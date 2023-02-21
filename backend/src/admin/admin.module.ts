import { Module } from '@nestjs/common';
import { S3Module } from 'src/aws-s3/s3.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule,S3Module],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

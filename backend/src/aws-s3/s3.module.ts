import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';

@Module({
  controllers: [S3Controller],
  providers: [S3Service, ConfigService],
  exports: [S3Service],
  imports: [ConfigModule],
})
export class S3Module {}

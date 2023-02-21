import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { S3Module } from "../aws-s3/s3.module";

@Module({
  imports: [PrismaModule, S3Module],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

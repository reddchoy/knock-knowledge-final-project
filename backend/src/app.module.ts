import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { CourseModule } from "./course/course.module";
import { ArticleModule } from "./article/article.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { S3Module } from './aws-s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    AdminModule,
    CourseModule,
    ArticleModule,
    PrismaModule,
    MulterModule.register({ dest: "./uploads" }),
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}

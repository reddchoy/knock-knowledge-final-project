import { uploadFileInterceptor } from './../multer/file-interceptor';
import { JwtGuard } from './../auth/guard';
import { GetUser } from './../auth/decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, EditArticleDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getActicles() {
    try{
      return this.articleService.getArticles();
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('details/:artcleId')
  getActicleById(@Param('artcleId', ParseIntPipe) articleId: number) {
    try{
        return this.articleService.getActicleById(articleId);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('coverImage', uploadFileInterceptor))
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') ownerId: number
  ) {
    try {
       return this.articleService.createArticle(ownerId, file, createArticleDto);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('edit/:artcleId')
  @UseInterceptors(FileInterceptor('coverImage', uploadFileInterceptor))
  editActicleById(
    @Param('artcleId', ParseIntPipe) articleId: number,
    @GetUser('id') ownerId: number,
    @Body() editArticleDto: EditArticleDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
       return this.articleService.editArticleById(articleId, ownerId, editArticleDto, file);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('handclap/:artcleId')
  getHandClaps(@Param('artcleId', ParseIntPipe) articleId: number) {
    try{
       return this.articleService.getHandclaps(articleId);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('handclap/create/:handclapArticleId')
  createHandclap(
    @Param('handclapArticleId', ParseIntPipe) handclapArticleId: number,
    @GetUser('id') userId: number
  ) {
    try {
        return this.articleService.createHandclap(userId, handclapArticleId);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('bookmark/create/:bookmarkArticleId')
  createArticleBookmark(
    @Param('bookmarkArticleId', ParseIntPipe) bookmarkArticleId: number,
    @GetUser('id') userId: number
  ) {
    try{
       return this.articleService.createArticleBookmark(userId, bookmarkArticleId);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('bookmark/delete/:bookmarkArticleId')
  deleteCourseBookmark(
    @Param('bookmarkArticleId', ParseIntPipe) bookmarkArticleId: number,
    @GetUser('id') userId: number
  ) {
    try{
       return this.articleService.deleteArticleBookmark(userId, bookmarkArticleId);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

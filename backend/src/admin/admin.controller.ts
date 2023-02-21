import { GetUser, isAdmin } from '../auth/decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard';
import { AdminService } from './admin.service';
import { EditCourseDto, EditArticleDto, CreateArticleDto } from './dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get() // POST, GET, PUT, DELETE
  getData(): string {
    return this.adminService.callDb();
  }

  //corse
  @UseGuards(JwtGuard)
  @Get('course')
  async getAllCourse(@isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const data = await this.adminService.getAllCourse();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('course/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'courseImage' }, { name: 'courseIntroVideo' }]))
  createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles()
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File },
    @GetUser('id') ownerId: number,
    @isAdmin('isAdmin') isAdmin: boolean
  ) {
    try {
      return this.adminService.createCourse(createCourseDto, files, ownerId);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('course/:id')
  async deleteCourse(@Param('id') id: number, @isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const resp = await this.adminService.delCourse(id);
      return resp;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Put('course/edit/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'courseImage' }, { name: 'courseIntroVideo' }]))
  async editCourse(
    @Body() editCourseDto: EditCourseDto,
    @Param('id') courseId: number,
    @UploadedFiles()
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File },
    @isAdmin('isAdmin') isAdmin: boolean
  ) {
    try {
      const data = await this.adminService.editCourse(courseId, editCourseDto, files);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  //article
  @UseGuards(JwtGuard)
  @Get('article')
  async getAllArticle(@isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const data = await this.adminService.getAllArticle();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('article/:id')
  async deleteArticle(@Param('id') id: number, @isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const resp = await this.adminService.delArticle(id);
      return resp;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Put('article/edit/:id')
  @UseInterceptors(FileInterceptor('coverImage'))
  async editArticle(
    @Body() editArticleDto: EditArticleDto,
    @Param('id') articleId: number,
    @UploadedFile()
    file: Express.Multer.File,
    @isAdmin('isAdmin') isAdmin: boolean
  ) {
    try {
      const data = await this.adminService.editArticle(articleId, editArticleDto, file);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('article/create')
  @UseInterceptors(FileInterceptor('coverImage'))
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser('id') userId: number,
    @isAdmin('isAdmin') isAdmin: boolean
  ) {
    try {
      const data = await this.adminService.createArticle(createArticleDto, file, userId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('user')
  async getAllUser(@isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const data = await this.adminService.getAllUser();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: number, @isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const resp = await this.adminService.deleteUser(id);
      return resp;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('review')
  async getAllReview(@isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const data = await this.adminService.getAllReview();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('review/:id')
  async deleteReview(@Param('id') reviewId: number, @isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const data = await this.adminService.deleteReview(reviewId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('order')
  async getAllOrder(@isAdmin('isAdmin') isAdmin: boolean) {
    try {
      const data = await this.adminService.getAllOrder();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

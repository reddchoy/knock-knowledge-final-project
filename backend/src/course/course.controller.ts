import { uploadFileInterceptor } from './../multer/file-interceptor';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
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
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CourseService } from './course.service';
import {
  CreateChapterDto,
  CreateCourseDto,
  CreatePostDto,
  CreateReviewDto,
  CreateSectionDto,
  CreateWorkDto,
  EditChapterDto,
  EditCourseDto,
  EditPostDto,
  EditReviewDto,
  EditSectionDto,
  EditWorkDto,
} from './dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // =======Course CRUD=======
  // @UseGuards(JwtGuard)
  @Get('homepage/course/detail')
  async getCourses() {
    const data = await this.courseService.getCourses();
    return data;
  }

  @Get('course/category/:category')
  async getCoursesByCategory(@Param('category') category: string) {
    try {
      const courses = await this.courseService.getCoursesByCategory(category);
      return courses;
    } catch (error) {
      throw new HttpException('no courses', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('detail/:courseId')
  getCourseById(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      return this.courseService.getCourseById(courseId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'courseImage' }, { name: 'courseIntroVideo' }]))
  createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles()
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File },
    @GetUser('id') ownerId: number
  ) {
    try {
      return this.courseService.createCourse(createCourseDto, files, ownerId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('edit/:courseId/category/:categoryId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'courseImage' }, { name: 'courseIntroVideo' }],
      uploadFileInterceptor
    )
  )
  editCourseById(
    @Param('courseId', ParseIntPipe) courseId: number,
    @GetUser('id') ownerId: number,
    @Body() dto: EditCourseDto,
    @UploadedFiles()
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File }
  ) {
    try {
      return this.courseService.editCourseById(courseId, ownerId, dto, files);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // =======Chapter=======
  @UseGuards(JwtGuard)
  @Post('chapter/create/:courseId')
  createChapter(
    @Body() createChapterDtoArray: Array<CreateChapterDto>,
    @Param('courseId', ParseIntPipe) courseId: number,
    @GetUser('id') ownerId: number
  ) {
    try {
      return this.courseService.createChapter(ownerId, courseId, createChapterDtoArray);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('chapter/:chpaterId/')
  editChapter(
    @Param('chpaterId', ParseIntPipe) chapterId: number,
    @GetUser('id') ownerId: number,
    @Body() editChapterDto: EditChapterDto
  ) {
    try {
      return this.courseService.editChapter(chapterId, editChapterDto, ownerId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // =======Section=======
  @UseGuards(JwtGuard)
  @Post('section/create/:chapterId')
  @UseInterceptors(FileInterceptor('content', uploadFileInterceptor))
  createSection(
    @Body() createSectionDtoArray: Array<CreateSectionDto>,
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @GetUser('id') ownerId: number,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    try {
      return this.courseService.createSection(ownerId, chapterId, createSectionDtoArray, file);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('section/:sectionId/')
  @UseInterceptors(FileInterceptor('content', uploadFileInterceptor))
  editSection(
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @GetUser('id') ownerId: number,
    @Body() editSectionDto: EditSectionDto,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    try {
      return this.courseService.editSection(sectionId, editSectionDto, file, ownerId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // =======Review CRUD=======
  @Get('reviews')
  getAllReviews() {
    try {
      return this.courseService.getAllReviews();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('reviews/:courseId')
  getReviews(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      return this.courseService.getReviews(courseId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('review/create/:courseId/')
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser('id') userId: number,
    @Param('courseId', ParseIntPipe) courseId: number
  ) {
    try {
      return this.courseService.createReview(userId, courseId, createReviewDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('review/edit/:reviewId')
  editReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @GetUser('id') userId: number,
    @Body() editReviewDto: EditReviewDto
  ) {
    try {
      return this.courseService.editReview(userId, reviewId, editReviewDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // =======Post CRUD=======
  @Get('posts/:courseId')
  getPosts(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      return this.courseService.getPosts(courseId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('post/create/:courseId')
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser('id') userId: number,
    @Param('courseId', ParseIntPipe) courseId: number
  ) {
    try {
      return this.courseService.createPost(userId, courseId, createPostDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('post/edit/:postId')
  editPost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser('id') userId: number,
    @Body() editPostDto: EditPostDto
  ) {
    try {
      return this.courseService.editPost(userId, postId, editPostDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('/post/:courseId/reply/:replyPostId')
  replyPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser('id') userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('replyPostId', ParseIntPipe) replyPostId: number
  ) {
    try {
      return this.courseService.replyPost(userId, courseId, replyPostId, createPostDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // =======Work CRUD=======
  @Get('works/:courseId')
  getWorks(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      return this.courseService.getWorks(courseId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('work/detail/:workId')
  getWorksById(@Param('workId', ParseIntPipe) workId: number) {
    try {
      return this.courseService.getWorkById(workId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('work/create/:sectionId')
  @UseInterceptors(FileInterceptor('workImage', uploadFileInterceptor))
  createWork(
    @Body() createWorkDto: CreateWorkDto,
    @UploadedFile()
    file: Express.Multer.File,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @GetUser('id') userId: number
  ) {
    try {
      return this.courseService.createWork(userId, sectionId, createWorkDto, file);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('work/edit/:workId')
  @UseInterceptors(FileInterceptor('workImage', uploadFileInterceptor))
  editWork(
    @Param('workId', ParseIntPipe) workId: number,
    @GetUser('id') userId: number,
    @Body() editWorkDto: EditWorkDto,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    try {
      return this.courseService.editWork(userId, workId, editWorkDto, file);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // =======Bookmark CRUD=======
  @UseGuards(JwtGuard)
  @Post('bookmark/create/:bookmarkCourseId')
  createCourseBookmark(
    @Param('bookmarkCourseId', ParseIntPipe) bookmarkCourseId: number,
    @GetUser('id') userId: number
  ) {
    try {
      return this.courseService.createCourseBookmark(userId, bookmarkCourseId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('bookmark/delete/:bookmarkCourseId')
  deleteCourseBookmark(
    @Param('bookmarkCourseId', ParseIntPipe) bookmarkCourseId: number,
    @GetUser('id') userId: number
  ) {
    try {
      return this.courseService.deleteCourseBookmark(userId, bookmarkCourseId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

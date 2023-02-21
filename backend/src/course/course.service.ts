import { S3Service } from './../aws-s3/s3.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateChapterDto, CreateSectionDto } from './dto/create-course.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCourseDto,
  CreatePostDto,
  CreateWorkDto,
  EditChapterDto,
  EditCourseDto,
  EditPostDto,
  EditReviewDto,
  EditSectionDto,
  EditWorkDto,
} from './dto';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';

export interface Course {
  id: number;
  name: string;
  duration: number;
  review: number;
  rating: number;
  image: string;
  classmate: number;
  videoNum: number;
  price: number;
  category?: object;
}

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  // =========Course=========
  async getCoursesByCategory(category: string) {
    let returnObj: Course[] = [];
    let courseVideoNumber = 0;
    const currentTime = new Date();
    let currentPrice: number;
    let rating = 0;

    const categoryId = (
      await this.prisma.categories.findMany({
        where: {
          name: category,
        },
      })
    )[0].id;

    const data = await this.prisma.categoriesCoursesMap.findMany({
      where: {
        catrgoryId: categoryId,
      },
      select: {
        catrgory: {
          select: {
            name: true,
            coverImage: true,
          },
        },
        course: {
          select: {
            id: true,
            courseImage: true,
            name: true,
            courseTotalDuration: true,
            courseStartDate: true,
            fundraiseStartDate: true,
            fundraiseEndDate: true,
            fundraisePrice: true,
            sellingPrice: true,
            reviews: {
              select: {
                courseRating: true,
              },
            },
            status: true,
            courseOrderDetails: true,
            chapters: {
              select: {
                sections: {
                  where: {
                    contentType: 'video',
                  },
                  select: {
                    content: true,
                  },
                },
              },
            },
          },
        },
      }
    })
    // const { categoriesCoursesMap } = (
    //   await this.prisma.categories.findMany({
    //     where: {
    //       name: category,

    //     },
    //     select: {
    //       categoriesCoursesMap: {
    //         select: {
    //           catrgory: true,
    //           course: {
    //             select: {
    //               id: true,
    //               courseImage: true,
    //               name: true,
    //               courseTotalDuration: true,
    //               courseStartDate: true,
    //               fundraiseStartDate: true,
    //               fundraiseEndDate: true,
    //               fundraisePrice: true,
    //               sellingPrice: true,
    //               reviews: {
    //                 select: {
    //                   courseRating: true,
    //                 },
    //               },
    //               status: true,
    //               courseOrderDetails: true,
    //               chapters: {
    //                 select: {
    //                   sections: {
    //                     where: {
    //                       contentType: 'video',
    //                     },
    //                     select: {
    //                       content: true,
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   })
    // )[0];

    const filterArray = data.filter((e) => e.course.status !== 'off_board');
    filterArray.forEach((e, i) => {
      courseVideoNumber = 0;
      e.course.chapters.forEach((chapter) => {
        courseVideoNumber += chapter.sections.length;
      });
      e.course.reviews.forEach((e) => {
        rating += +e.courseRating;
      });
      returnObj[i] = {} as Course;
      returnObj[i].id = e.course.id;
      returnObj[i].name = e.course.name;
      returnObj[i].duration = e.course.courseTotalDuration;
      returnObj[i].classmate = e.course.courseOrderDetails.length;
      returnObj[i].image = e.course.courseImage;
      returnObj[i].category = e.catrgory;

      if (currentTime >= e.course.fundraiseStartDate && currentTime <= e.course.fundraiseEndDate) {
        currentPrice = e.course.fundraisePrice;
      } else {
        currentPrice = e.course.sellingPrice;
      }
      returnObj[i].price = currentPrice;
      returnObj[i].videoNum = courseVideoNumber + 1;
      returnObj[i].rating = rating / e.course.reviews.length;
    });
    return returnObj;
  }

  async getCourses() {
    let returnObj: Course[] = [];
    let courseVideoNumber = 0;
    const currentTime = new Date();
    let currentPrice: number;
    let rating = 0;

    const courses = await this.prisma.courses.findMany({
      where: {
        NOT: {
          status: 'off_board',
        },
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        courseImage: true,
        name: true,
        courseTotalDuration: true,
        courseStartDate: true,
        fundraiseStartDate: true,
        fundraiseEndDate: true,
        fundraisePrice: true,
        sellingPrice: true,
        categoriesCoursesMap: {
          select: {
            catrgory: true,
          },
        },
        reviews: {
          select: {
            courseRating: true,
          },
        },
        status: true,
        courseOrderDetails: true,
        chapters: {
          select: {
            sections: {
              where: {
                contentType: 'video',
              },
              select: {
                content: true,
              },
            },
          },
        },
      },
    });

    courses.forEach((e, i) => {
      courseVideoNumber = 0;
      e.chapters.forEach((chapter) => {
        courseVideoNumber += chapter.sections.length;
      });
      e.reviews.forEach((e) => {
        rating += +e.courseRating;
      });
      returnObj[i] = {} as Course;
      returnObj[i].id = e.id;
      returnObj[i].name = e.name;
      returnObj[i].duration = e.courseTotalDuration;
      returnObj[i].classmate = e.courseOrderDetails.length;
      returnObj[i].image = e.courseImage;
      returnObj[i].category = e.categoriesCoursesMap ?? null;
      if (currentTime >= e.fundraiseStartDate && currentTime <= e.fundraiseEndDate) {
        currentPrice = e.fundraisePrice;
      } else {
        currentPrice = e.sellingPrice;
      }
      returnObj[i].price = currentPrice;
      returnObj[i].videoNum = courseVideoNumber + 1;
      returnObj[i].rating = rating / e.reviews.length;
      returnObj[i].review = e.reviews.length;
    });
    return returnObj;
  }

  async getCourseById(courseId: number) {
    let courseVideoNumber = 0;
    const currentTime = new Date();
    let currentPrice: number;
    let rating = 0;

    const course = await this.prisma.courses.findUnique({
      where: {
        id: courseId,
      },
      include: {
        categoriesCoursesMap: {
          select: {
            catrgory: true,
          },
        },
        courseOrderDetails: true,
        owner: {
          select: {
            username: true,
            userProfiles: true,
          },
        },
        reviews: {
          orderBy: {
            id: 'desc',
          },
          select: {
            content: true,
            courseRating: true,
            id: true,
            user: {
              select: {
                username: true,
                userProfiles: {
                  select: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
        chapters: {
          select: {
            id: true,
            chapterName: true,
            chapterOrderNum: true,
            sections: true,
          },
        },
      },
    });
    if (currentTime >= course.fundraiseStartDate && currentTime <= course.fundraiseEndDate) {
      currentPrice = course.fundraisePrice;
    } else {
      currentPrice = course.sellingPrice;
    }
    course.chapters.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        if (section.contentType === 'video') {
          courseVideoNumber += 1;
        }
      });
    });
    course.reviews.forEach((e) => {
      rating += +e.courseRating;
    });
    course['currentPrice'] = currentPrice;
    course['videoNum'] = courseVideoNumber + 1;
    course['rating'] = rating / course.reviews.length;
    course['classmate'] = course.courseOrderDetails.length;
    return course;
  }

  async createCourse(
    createCourseDto: CreateCourseDto,
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File },
    ownerId: number
  ) {
    const imageName = files.courseImage[0].originalname.split('.')[0];
    const imageExtension = files.courseImage[0].originalname.split('.')[1];
    const imageKey = "image/" + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);

    const videoName = files.courseIntroVideo[0].originalname.split('.')[0];
    const videoExtension = files.courseIntroVideo[0].originalname.split('.')[1];
    const videoKey =
      'video/' + (videoName.split(' ').join('_') + '_' + Date.now() + '.' + videoExtension);

    const imageUrl: string = await this.s3Service.uploadImageFile(files.courseImage[0], imageKey)

    const videoUrl: string = await this.s3Service.uploadVideoFile(
      files.courseIntroVideo[0],
      videoKey
    );

    const course = await this.prisma.courses.create({
      data: {
        name: createCourseDto.name,
        sellingPrice: createCourseDto.sellingPrice,
        courseTotalDuration: createCourseDto.courseTotalDuration,
        longDescription: createCourseDto.longDescription,
        shortDescription: createCourseDto.shortDescription,
        courseIntroVideo: videoUrl,
        courseImage: imageUrl,
        owner: { connect: { id: ownerId } },
        categoriesCoursesMap: {
          create: {
            catrgoryId: createCourseDto.catrgoryId,
          },
        },
      },
    });

    return { message: 'course created successfully', course };
  }

  async editCourseById(
    courseId: number,
    ownerId: number,
    editCourseDto: EditCourseDto,
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File }
  ) {
    const imageName = files.courseImage[0].originalname.split('.')[0];
    const imageExtension = files.courseImage[0].originalname.split('.')[1];
    const imageKey = "image/" + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);

    const videoName = files.courseIntroVideo[0].originalname.split('.')[0];
    const videoExtension = files.courseIntroVideo[0].originalname.split('.')[1];
    const videoKey =
      'video/' + (videoName.split(' ').join('_') + '_' + Date.now() + '.' + videoExtension);

    const imageUrl: string = await this.s3Service.uploadImageFile(files.courseImage[0], imageKey)

    const videoUrl: string = await this.s3Service.uploadVideoFile(
      files.courseIntroVideo[0],
      videoKey
    );

    const course = await this.prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course || course.ownerId !== ownerId)
      throw new ForbiddenException('The course does not exist!');

    return this.prisma.courses.update({
      where: {
        id: courseId,
      },
      data: {
        name: editCourseDto.name,
        sellingPrice: editCourseDto.sellingPrice,
        courseTotalDuration: editCourseDto.courseTotalDuration,
        longDescription: editCourseDto.longDescription,
        shortDescription: editCourseDto.shortDescription,
        courseIntroVideo: videoUrl,
        courseImage: imageUrl,
        owner: { connect: { id: ownerId } },
        categoriesCoursesMap: {
          create: {
            catrgoryId: editCourseDto.catrgoryId,
          },
        },
      },
    });
  }

  // ========Chapter========
  async createChapter(
    ownerId: number,
    courseId: number,
    createChapterDtoArray: Array<CreateChapterDto>
  ) {
    const course = await this.prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course || course.id !== courseId || course.ownerId !== ownerId)
      throw new ForbiddenException('The course does not exist!');

    for (let createChapterDto of createChapterDtoArray) {
      await this.prisma.chapters.create({
        data: {
          courseId,
          chapterName: createChapterDto.chapterName,
          chapterOrderNum: createChapterDto.chapterOrderNum,
        },
      });
    }

    return { message: 'chapter created successfully' };
  }

  async editChapter(chapterId: number, editChapterDto: EditChapterDto, ownerId: number) {
    const chapterToBeEdit = await this.prisma.chapters.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        course: {
          select: {
            ownerId: true,
          },
        },
      },
    });
    if (
      !chapterToBeEdit ||
      chapterToBeEdit.id !== chapterId ||
      chapterToBeEdit.course.ownerId !== ownerId
    )
      throw new ForbiddenException('The chapter does not exist!');

    await this.prisma.chapters.update({
      where: {
        id: chapterId,
      },
      data: {
        chapterName: editChapterDto.chapterName,
        chapterOrderNum: editChapterDto.chapterOrderNum,
      },
    });

    return { message: 'chapter edited successfully' };
  }

  // =========Section=========
  async createSection(
    ownerId: number,
    chapterId: number,
    createSectionDtoArray: Array<CreateSectionDto>,
    file: Express.Multer.File
  ) {
    const chapter = await this.prisma.chapters.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        course: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (!chapter || chapter.id !== chapterId || chapter.course.ownerId !== ownerId)
      throw new ForbiddenException('The section does not exist!');

    for (let createSectionDto of createSectionDtoArray) {
      await this.prisma.sections.create({
        data: {
          chapterId,
          sectionName: createSectionDto.sectionName,
          contentType: createSectionDto.contentType,
          content: file.filename,
          sectionOrderNum: createSectionDto.sectionOrderNum,
        },
      });
    }
    return { message: 'section created successfully' };
  }

  async editSection(
    sectionId: number,
    editSectionDto: EditSectionDto,
    file: Express.Multer.File,
    ownerId: number
  ) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id: sectionId,
      },
      include: {
        chapter: {
          select: {
            chapterName: true,
            chapterOrderNum: true,
            course: true,
          },
        },
      },
    });
    // Logger.log(section.chapter.course.ownerId);

    if (!section || section.id !== sectionId || section.chapter.course.ownerId !== ownerId)
      throw new ForbiddenException('The section does not exist!');

    await this.prisma.sections.update({
      where: {
        id: sectionId,
      },
      data: {
        contentType: editSectionDto.contentType,
        sectionName: editSectionDto.sectionName,
        sectionOrderNum: editSectionDto.sectionOrderNum,
        isLocked: editSectionDto.isLocked,
        content: file?.filename || null,
      },
    });

    return { message: 'section edited successfully' };
  }

  // =========Review=========
  getAllReviews() {
    return this.prisma.reviews.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            phoneNumber: true,
            userProfiles: { select: { icon: true } },
          },
        },
      },
    });
  }

  getReviews(courseId: number) {
    return this.prisma.reviews.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        courseId: courseId,
      },
      include: {
        user: { select: { username: true, email: true, phoneNumber: true } },
      },
    });
  }

  async createReview(userId: number, courseId: number, createReviewDto: CreateReviewDto) {
    const review = await this.prisma.reviews.create({
      data: {
        userId,
        courseId,
        content: createReviewDto.content,
        courseRating: createReviewDto.courseRating,
      },
    });

    return { message: 'review created successfully', review };
  }

  async editReview(userId: number, reviewId: number, editReviewDto: EditReviewDto) {
    const review = await this.prisma.reviews.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        course: { select: { id: true } },
      },
    });
    if (!review || review.id !== reviewId || review.userId !== userId)
      throw new ForbiddenException('The review does not exist!');

    return this.prisma.reviews.update({
      where: {
        id: reviewId,
      },
      data: {
        content: editReviewDto.content,
        courseRating: editReviewDto.courseRating,
      },
    });
  }

  // =========Post=========
  getPosts(courseId: number) {
    return this.prisma.posts.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        user: { select: { username: true, email: true, phoneNumber: true } },
      },
    });
  }

  async createPost(userId: number, courseId: number, createPostDto: CreatePostDto) {
    const post = await this.prisma.posts.create({
      data: {
        userId,
        courseId,
        content: createPostDto.content,
      },
    });

    return { message: 'post created successfully', post };
  }

  async editPost(userId: number, postId: number, editPostDto: EditPostDto) {
    const post = await this.prisma.posts.findUnique({
      where: {
        id: postId,
      },
      include: {
        course: { select: { id: true } },
      },
    });
    if (!post || post.id !== postId || post.userId !== userId)
      throw new ForbiddenException('The post does not exist!');

    return this.prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        content: editPostDto.content,
      },
    });
  }

  async replyPost(
    userId: number,
    courseId: number,
    replyPostId: number,
    createPostDto: CreatePostDto
  ) {
    const post = await this.prisma.posts.findUnique({
      where: {
        id: replyPostId,
      },
      include: {
        course: { select: { id: true, ownerId: true } },
      },
    });
    if (!post || post.id !== replyPostId || post.course.ownerId !== userId)
      throw new ForbiddenException('The post does not exist!');

    const replyPost = await this.prisma.posts.create({
      data: {
        userId,
        courseId,
        replyPostId,
        content: createPostDto.content,
      },
    });

    return { message: 'post replied successfully', replyPost };
  }

  // =========Work=========
  async getWorks(courseId: number) {
    const works = await this.prisma.courses.findMany({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          select: {
            sections: {
              select: { works: true },
            },
          },
        },
      },
    });
    return works;
  }

  getWorkById(workId: number) {
    return this.prisma.works.findUnique({
      where: {
        id: workId,
      },
      include: {
        user: {
          select: {
            userProfiles: true,
          },
        },
      },
    });
  }

  async createWork(
    userId: number,
    sectionId: number,
    createWorkDto: CreateWorkDto,
    file: Express.Multer.File
  ) {
    const work = await this.prisma.works.create({
      data: {
        workImage: file.filename,
        content: createWorkDto.content,
        userId,
        sectionId,
      },
    });
    return { message: 'work created successfully', work };
  }

  async editWork(
    userId: number,
    workId: number,
    editWorkDto: EditWorkDto,
    file: Express.Multer.File
  ) {
    const work = await this.prisma.works.findUnique({
      where: {
        id: workId,
      },
      include: {
        section: {
          select: {
            id: true,
          },
        },
      },
    });
    // Logger.log(section.chapter.course.ownerId);

    if (!work || work.id !== workId || work.userId !== userId)
      throw new ForbiddenException('The work does not exist!');

    return this.prisma.works.update({
      where: {
        id: workId,
      },
      data: {
        workImage: file.filename || null,
        content: editWorkDto.content,
      },
    });
  }

  // =========Bookmark=========
  async createCourseBookmark(userId: number, courseId: number) {
    const course = await this.prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course || course.id !== courseId)
      throw new ForbiddenException('The course does not exist, you cannot bookmark!');

    const bookmarkCourse = await this.prisma.bookMarks.create({
      data: { userId, courseId },
    });

    return { message: 'course bookmarked successfully', bookmarkCourse };
  }

  async deleteCourseBookmark(userId: number, courseBookmarkId: number) {
    const courseBookmark = await this.prisma.bookMarks.findUnique({
      where: {
        id: courseBookmarkId,
      },
    });

    if (!courseBookmark || courseBookmark.id !== courseBookmarkId)
      throw new ForbiddenException('The course bookmark does not exist, you cannot bookmark!');

    await this.prisma.bookMarks.delete({
      where: {
        id: courseBookmarkId,
      },
    });

    return { message: 'course bookmark deleted successfully' };
  }
}

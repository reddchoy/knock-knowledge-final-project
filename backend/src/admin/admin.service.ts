import { S3Service } from './../aws-s3/s3.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto, EditArticleDto, EditCourseDto } from './dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  callDb(): string {
    return 'admin dbData got!!!';
  }

  async getAllCourse() {
    const data = await this.prisma.courses.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        status: true,
        name: true,
        sellingPrice: true,
        courseTotalDuration: true,
        courseImage: true,
        courseIntroVideo: true,
        longDescription: true,
        shortDescription: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (data.length === 0) {
      throw { message: 'no data' };
    }
    const count = await this.prisma.courses.count();
    if (!count) {
      throw { message: 'no data' };
    }
    return { data, count };
  }

  async createCourse(
    createCourseDto: CreateCourseDto,
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File },
    ownerId: number
  ) {
    const imageName = files.courseImage[0].originalname.split('.')[0];
    const imageExtension = files.courseImage[0].originalname.split('.')[1];
    const imageKey =
      'image/' + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);

    const videoName = files.courseIntroVideo[0].originalname.split('.')[0];
    const videoExtension = files.courseIntroVideo[0].originalname.split('.')[1];
    const videoKey =
      'video/' + (videoName.split(' ').join('_') + '_' + Date.now() + '.' + videoExtension);

    const imageUrl: string = await this.s3Service.uploadImageFile(files.courseImage[0], imageKey);

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

  async delCourse(id: number) {
    const data = await this.prisma.courses.update({
      where: {
        id: id,
      },
      data: {
        status: 'off_board',
      },
    });
    if (Object.keys(data).length === 0) {
      throw { message: 'no data' };
    }
    return { message: 'deleted' };
  }

  async editCourse(
    id: number,
    dto: EditCourseDto,
    files: { courseImage: Express.Multer.File; courseIntroVideo: Express.Multer.File }
  ) {

    const mapId = (await this.prisma.categoriesCoursesMap.findMany({
      where:{
        courseId:id
      }
    }))[0].id

    if (Object.keys(files).length === 0) {
      const { courseImage, courseIntroVideo } = await this.prisma.courses.findUnique({
        where: {
          id: id,
        },
        select: {
          courseImage: true,
          courseIntroVideo: true,
        },
      });

      const data = await this.prisma.courses.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          status: dto.status,
          sellingPrice: dto.sellingPrice,
          courseTotalDuration: dto.courseTotalDuration,
          longDescription: dto.longDescription,
          shortDescription: dto.shortDescription,
          courseIntroVideo: courseIntroVideo,
          courseImage: courseImage,
          categoriesCoursesMap: {
            updateMany: {
              where:{
                id: mapId
              },
              data:{
                catrgoryId: dto.catrgoryId,
              }
            },
          },
        },
      });
      return { message: 'update course with no image and video' };
    } 
    if(files.courseIntroVideo !== undefined){
      if (Object.keys(files.courseIntroVideo[0]).length > 0 && (files.courseImage) === undefined) {
        const videoName = files.courseIntroVideo[0].originalname.split('.')[0];
        const videoExtension = files.courseIntroVideo[0].originalname.split('.')[1];
        const videoKey =
          'video/' + (videoName.split(' ').join('_') + '_' + Date.now() + '.' + videoExtension);
      
        const videoUrl: string = await this.s3Service.uploadVideoFile(
          files.courseIntroVideo[0],
          videoKey
        );
  
        const imageUrl = (
          await this.prisma.courses.findUnique({
            where: {
              id: id,
            },
            select: {
              courseImage: true,
            },
          })
        ).courseImage;
  
        const data = await this.prisma.courses.update({
          where: {
            id: id,
          },
          data: {
            name: dto.name,
            status: dto.status,
            sellingPrice: dto.sellingPrice,
            courseTotalDuration: dto.courseTotalDuration,
            longDescription: dto.longDescription,
            shortDescription: dto.shortDescription,
            courseIntroVideo: videoUrl,
            courseImage: imageUrl,
            categoriesCoursesMap: {
              updateMany: {
                where:{
                  id: mapId
                },
                data:{
                  catrgoryId: dto.catrgoryId,
                }
              },
            },
          },
        });
  
        return {message:"update course with no image"}
  
      } 
    }
    if(files.courseImage !== undefined){
      if (Object.keys(files.courseImage[0]).length > 0 && (files.courseIntroVideo) === undefined) {
        const imageName = files.courseImage[0].originalname.split('.')[0];
        const imageExtension = files.courseImage[0].originalname.split('.')[1];
        const imageKey =
          'image/' + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);
  
        const imageUrl: string = await this.s3Service.uploadImageFile(files.courseImage[0], imageKey);
  
        const videoUrl = (
          await this.prisma.courses.findUnique({
            where: {
              id: id,
            },
            select: {
              courseIntroVideo: true,
            },
          })
        ).courseIntroVideo;
  
        const data = await this.prisma.courses.update({
          where: {
            id: id,
          },
          data: {
            name: dto.name,
            status: dto.status,
            sellingPrice: dto.sellingPrice,
            courseTotalDuration: dto.courseTotalDuration,
            longDescription: dto.longDescription,
            shortDescription: dto.shortDescription,
            courseIntroVideo: videoUrl,
            courseImage: imageUrl,
            categoriesCoursesMap: {
              updateMany: {
                where:{
                  id: mapId
                },
                data:{
                  catrgoryId: dto.catrgoryId,
                }
              },
            },
          },
        });
        return { message: 'update course with no video' };
      }
    }
    const imageName = files.courseImage[0].originalname.split('.')[0];
    const imageExtension = files.courseImage[0].originalname.split('.')[1];
    const imageKey =
      'image/' + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);

    const videoName = files.courseIntroVideo[0].originalname.split('.')[0];
    const videoExtension = files.courseIntroVideo[0].originalname.split('.')[1];
    const videoKey =
      'video/' + (videoName.split(' ').join('_') + '_' + Date.now() + '.' + videoExtension);

    const imageUrl: string = await this.s3Service.uploadImageFile(files.courseImage[0], imageKey);

    const videoUrl: string = await this.s3Service.uploadVideoFile(
      files.courseIntroVideo[0],
      videoKey
    );

    const data = await this.prisma.courses.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        status: dto.status,
        sellingPrice: dto.sellingPrice,
        courseTotalDuration: dto.courseTotalDuration,
        longDescription: dto.longDescription,
        shortDescription: dto.shortDescription,
        courseIntroVideo: videoUrl,
        courseImage: imageUrl,
        categoriesCoursesMap: {
          updateMany: {
            where:{
              id: mapId
            },
            data:{
              catrgoryId: dto.catrgoryId,
            }
          },
        },
      },
    });
    if (Object.keys(data).length === 0) {
      throw { message: 'update failed' };
    }
    return { message: 'update success' };
  }

  async getAllArticle() {
    const data = await this.prisma.articles.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    if (data.length === 0) {
      throw { message: 'no data' };
    }
    const count = await this.prisma.articles.count();
    if (!count) {
      throw { message: 'no data' };
    }
    return { data, count };
  }

  async delArticle(id: number) {
    const data = await this.prisma.articles.update({
      where: {
        id: id,
      },
      data: {
        status: 'off_board',
      },
    });
    if (Object.keys(data).length === 0) {
      throw { message: 'no data' };
    }
    return { message: 'deleted' };
  }

  async editArticle(id: number, dto: EditArticleDto, file: Express.Multer.File) {
    let data: any;
    if (file !== undefined) {
      const imageName = file.originalname.split('.')[0];
      const imageExtension = file.originalname.split('.')[1];
      const imageKey =
        'image/' + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);

      const imageUrl: string = await this.s3Service.uploadImageFile(file, imageKey);

      data = await this.prisma.articles.update({
        where: {
          id: id,
        },
        data: {
          status: dto.status,
          title: dto.title,
          content: dto.content,
          coverImage: imageUrl,
        },
      });
    } else if (file === undefined) {
      const imageUrl = (
        await this.prisma.articles.findUnique({
          where: {
            id: id,
          },
        })
      ).coverImage;

      data = await this.prisma.articles.update({
        where: {
          id: id,
        },
        data: {
          status: dto.status,
          title: dto.title,
          content: dto.content,
          coverImage: imageUrl,
        },
      });
    }

    if (Object.keys(data).length === 0) {
      throw { message: 'update failed' };
    }
    return { message: 'update success' };
  }

  async createArticle(dto: CreateArticleDto, file: Express.Multer.File, userId: number) {
    const imageName = file.originalname.split('.')[0];
    const imageExtension = file.originalname.split('.')[1];
    const imageKey =
      'image/' + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);

    const imageUrl: string = await this.s3Service.uploadImageFile(file, imageKey);

    const data = await this.prisma.articles.create({
      data: {
        title: dto.title,
        content: dto.content,
        coverImage: imageUrl,
        ownerId: userId,
      },
    });
    if (Object.keys(data).length === 0) {
      throw { message: 'create failed' };
    }
    return { message: 'create success' };
  }

  async getAllUser() {
    const data = await this.prisma.users.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        username: true,
        email: true,
        phoneNumber: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (data.length === 0) {
      throw { message: 'no data' };
    }
    const count = await this.prisma.users.count();
    if (!count) {
      throw { message: 'no data' };
    }
    return { data, count };
  }

  async deleteUser(id: number) {
    const data = await this.prisma.users.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
    if (Object.keys(data).length === 0) {
      throw { message: 'no data' };
    }
    return { message: 'deleted' };
  }

  async getAllReview() {
    const data = await this.prisma.reviews.findMany({});
    if (data.length === 0) {
      throw { message: 'no data' };
    }
    return data;
  }

  async deleteReview(reviewId: number) {
    const data = await this.prisma.reviews.delete({
      where: {
        id: reviewId,
      },
    });
    if (Object.keys(data).length === 0) {
      throw { message: 'review is not exist' };
    }
    return { message: 'deleted' };
  }

  async getAllOrder() {
    let count = 0;
    const data = await this.prisma.courseOrders.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    if (data.length === 0) {
      throw { message: 'no data' };
    }
    data.forEach((e) => {
      count += +e.totalAmount;
    });

    return { data, count };
  }
}

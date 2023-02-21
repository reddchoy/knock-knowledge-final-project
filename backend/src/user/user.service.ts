import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { IsNotEmpty, IS_NOT_EMPTY, IS_NOT_IN } from 'class-validator';
import { CouponDto } from './dto/useCoupon.dto';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UseFilters,
} from '@nestjs/common';
import { Coupons, Prisma, RedeemCoupons, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToShoppingCartDto } from './dto/addToShoppingCart.dto';
import { EditUserProfileDto, ResetUserPassword } from './dto/edit-user-profile.dto';
import { Stripe } from 'stripe';
import { throws } from 'assert';
import { S3Service } from '../aws-s3/s3.service';
import * as argon from 'argon2';

export interface CartCourses {
  id: number;
  courseId: number;
  currentPrice: number;
  status: string;
  name: string;
  image: string;
  duration: number;
  classmate: number;
  videoNumber: number;
}

export interface orderDetail {
  id: number;
  currentPrice: number;
  courseStatus: string;
  orderStatus: string;
  name: string;
  image: string;
  duration: number;
  classmate: number;
  videoNumber: number;
  receiptNumber: number;
  orderTime: Date;
  discountAmount: number;
  totalAmount: number;
}

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
export class UserService {
  private stripe: Stripe;
  constructor(private prisma: PrismaService, private s3Service: S3Service) {
    this.stripe = new Stripe(process.env.STRIPE_PRIVATE, {
      apiVersion: '2022-11-15',
    });
  }

  callDb(): string {
    return 'user dbData got!!!';
  }

  async getUser() {
    const user = await this.prisma.users.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    return user;
  }

  async getUserAndCart(userId: number) {

    const returnObj = {};
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        userProfiles: {
          select: {
            icon: true,
            coverImage: true,
            name: true,
            description: true,
          },
        },
        shoppingCarts: true,
      },
    });

    if (user.shoppingCarts.length > 0) {
      returnObj['courseInCart'] = user.shoppingCarts.length;
    } else {
      returnObj['courseInCart'] = 0;
    }
    if (user.userProfiles.length > 0) {
      returnObj['icon'] = user.userProfiles[0].icon;
    } else {
      returnObj['icon'] = null;
    }

    returnObj['isAdmin'] = user.isAdmin;

    return returnObj;
  }

  async checkUserOrder(userId: number, courseId: number) {
    const order = await this.prisma.courseOrderDetails.findMany({
      where: {
        courseId: courseId,
        courseOrder: {
          userId: userId,
          status: 'successed',
        },
      },
    });
    if (order.length === 0) {
      throw { message: false };
    }
    return order;
  }

  async getCurrentUser(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        userProfiles: {
          select: {
            icon: true,
            coverImage: true,
            name: true,
            description: true,
          },
        },
        shoppingCarts: true,
      },
    });
    if (user.shoppingCarts.length > 0) {
      user['courseInCart'] = user.shoppingCarts.length;
      return user;
    }
    user['courseInCart'] = 0;
    return user;
  }

  async getUserProfile(userId: number) {
    const queryResult = await this.prisma.userProfiles.findMany({
      where: {
        userId: userId,
      },
    });
    return queryResult;
  }

  async getUserArticle(userId: number) {
    const queryResult = await this.prisma.articles.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        owner: {
          select: {
            username: true,
          },
        },
        title: true,
        coverImage: true,
        createdAt: true,
      },
    });
    return queryResult;
  }

  async getUserWork(userId: number) {
    const queryResult = await this.prisma.works.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        workImage: true,
        content: true,
        section: {
          select: {
            sectionName: true,
            chapter: {
              select: {
                chapterName: true,
                course: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return queryResult;
  }

  async getUserBookMark(userId: number) {
    const queryResult = await this.prisma.bookMarks.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        course: {
          select: {
            id: true,
            status: true,
            name: true,
            sellingPrice: true,
            fundraisePrice: true,
            fundraiseStartDate: true,
            fundraiseEndDate: true,
            courseStartDate: true,
            courseMinimumSize: true,
            courseTotalDuration: true,
            courseImage: true,
            shortDescription: true,
            createdAt: true,
            owner: {
              select: {
                username: true,
              },
            },
            categoriesCoursesMap: {
              select: {
                catrgory: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        article: {
          select: {
            id: true,
            status: true,
            title: true,
            content: true,
            coverImage: true,
            owner: {
              select: {
                username: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return queryResult;
  }

  async getOwnerCourses(userId: number) {
    const ownerCourses = await this.prisma.courses.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        status: true,
        name: true,
        sellingPrice: true,
        fundraisePrice: true,
        courseMinimumSize: true,
        courseImage: true,
        courseStartDate: true,
        shortDescription: true,
        courseTotalDuration: true,
        fundraiseEndDate: true,
        fundraiseStartDate: true,
        createdAt: true,
        categoriesCoursesMap: {
          select: {
            catrgory: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return ownerCourses;
  }

  async getOrders(userId: number) {
    const boughtCourses = await this.prisma.courseOrders.findMany({
      where: {
        userId: userId,
        status: 'successed',
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        orderTime: true,
        createdAt: true,
        courseOrderDetails: {
          select: {
            id: true,
            course_price: true,
            course: {
              select: {
                id: true,
                name: true,
                courseImage: true,
              },
            },
          },
        },
        // redeemCoupon: {
        //   select: {
        //     coupon: {
        //       select: {
        //         discountAmount: true,
        //       },
        //     },
        //   },
        // },
      },
    });
    if (boughtCourses.length === 0) {
      throw { message: 'no orders' };
    }
    return boughtCourses;
  }

  async getOrderAndDetail(orderId: number) {
    let returnObj: orderDetail[] = [];
    let courseVideoNumber: number = 0;
    const order = (
      await this.prisma.courseOrders.findMany({
        where: {
          id: orderId,
        },
        select: {
          totalAmount: true,
          receiptNumber: true,
          orderTime: true,
          status: true,
          courseOrderDetails: {
            select: {
              id: true,
              course_price: true,
              coursesStatus: true,
              course: {
                select: {
                  name: true,
                  courseImage: true,
                  courseTotalDuration: true,
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
            },
          },
          redeemCoupon: {
            select: {
              coupon: {
                select: {
                  discountAmount: true,
                },
              },
            },
          },
        },
      })
    )[0];


    order.courseOrderDetails.forEach((e, i) => {
      courseVideoNumber = 0;
      e.course.chapters.forEach((chapter) => {
        courseVideoNumber += chapter.sections.length;
      });

      returnObj[i] = {} as orderDetail;
      returnObj[i].id = e.id;
      returnObj[i].totalAmount = +order.totalAmount;
      if (!order.redeemCoupon) {
        returnObj[i].discountAmount = 0;
      } else {
        returnObj[i].discountAmount = order.redeemCoupon?.coupon.discountAmount;
      }
      returnObj[i].courseStatus = e.coursesStatus;
      returnObj[i].orderStatus = order.status;
      returnObj[i].name = e.course.name;
      returnObj[i].image = e.course.courseImage;
      returnObj[i].duration = e.course.courseTotalDuration;
      returnObj[i].classmate = order.courseOrderDetails.length;
      returnObj[i].videoNumber = courseVideoNumber;
      returnObj[i].currentPrice = e.course_price;
      returnObj[i].orderTime = order.orderTime;
      returnObj[i].receiptNumber = order.receiptNumber;
    });
    return returnObj;
  }

  async getCartCourses(userId: number) {
    const currentTime = new Date();
    let currentPrice: number;
    let returnObj: CartCourses[] = [];
    let courseVideoNumber: number = 0;

    const cart = await this.prisma.shoppingCarts.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        course: {
          select: {
            id: true,
            status: true,
            name: true,
            courseImage: true,
            courseTotalDuration: true,
            fundraisePrice: true,
            sellingPrice: true,
            fundraiseStartDate: true,
            fundraiseEndDate: true,
            courseStartDate: true,
            courseOrderDetails: {
              select: {
                id: true,
              },
            },
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
      },
    });

    cart.forEach((e, i) => {
      courseVideoNumber = 0;
      e.course.chapters.forEach((chapter) => {
        courseVideoNumber += chapter.sections.length;
      });

      if (currentTime >= e.course.fundraiseStartDate && currentTime <= e.course.fundraiseEndDate) {
        currentPrice = e.course.fundraisePrice;
      } else {
        currentPrice = e.course.sellingPrice;
      }
      returnObj[i] = {} as CartCourses;
      returnObj[i].id = e.id;
      returnObj[i].status = e.course.status;
      returnObj[i].name = e.course.name;
      returnObj[i].courseId = e.course.id;
      returnObj[i].image = e.course.courseImage;
      returnObj[i].duration = e.course.courseTotalDuration;
      returnObj[i].classmate = e.course.courseOrderDetails.length;
      returnObj[i].videoNumber = courseVideoNumber;
      returnObj[i].currentPrice = currentPrice;
    });
    return returnObj;
  }

  async checkToShoppingCart(userId: number, courseId: number) {
    const data = await this.prisma.shoppingCarts.findMany({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    if (data.length === 0) {
      throw { message: false };
    }
    return data;
  }

  async addToShoppingCart(userId: number, courseId: number) {
    const checkOrderDetail = await this.prisma.courseOrderDetails.findMany({
      where: {
        courseOrder: {
          userId: userId,
          status: 'successed',
        },
        courseId: courseId,
      },
    });
    if (checkOrderDetail.length > 0) {
      throw { message: 'u bought this course already' };
    }
    const data = await this.prisma.shoppingCarts.findMany({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    if (data.length === 0) {
      const courseAdded = await this.prisma.shoppingCarts.create({
        data: {
          userId: userId,
          courseId: courseId,
        },
      });
      return courseAdded;
    }
    return;
  }

  async deleteShoppingCartCourse(userId: number, cartCourseId: number) {
    await this.prisma.shoppingCarts.deleteMany({
      where: {
        id: cartCourseId,
        userId: userId,
      },
    });
  }

  async delFalseRedeemCoupon(userId: number) {
    await this.prisma.redeemCoupons.deleteMany({
      where: {
        userId: userId,
        isUsed: false,
      },
    });
    return;
  }

  async getRedeemCoupons(userId: number) {
    const queryResult = await this.prisma.redeemCoupons.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        isUsed: true,
        coupon: {
          select: {
            id: true,
            promocode: true,
            name: true,
            discountAmount: true,
            startAt: true,
            endAt: true,
            isActive: true,
          },
        },
      },
    });
    return queryResult;
  }

  async redeemCoupon(userId: number, dto: CouponDto) {
    const currentTime = new Date();
    if (!dto.promocode) {
      throw { message: 'no promocode' };
    }
    const coupon = await this.prisma.coupons.findMany({
      where: {
        promocode: dto.promocode || '',
        isActive: true,
        startAt: { lt: currentTime },
        endAt: { gt: currentTime },
        NOT: {
          quantity: 0,
        },
      },
      select: {
        id: true,
        promocode: true,
        quantity: true,
        discountAmount: true,
      },
    });

    if (coupon[0]?.quantity <= 0) {
      throw { message: 'coupon quantity = 0' };
    }

    if (coupon.length === 0) {
      throw { message: 'coupon not exist' };
    }

    const checkRedeemCoupon = await this.prisma.redeemCoupons.findMany({
      where: {
        userId: userId,
        couponId: coupon[0].id,
      },
    });

    if (checkRedeemCoupon.length !== 0) {
      throw { message: 'coupon already exist or used' };
    }


    return coupon[0];
  }

  ////create
  async createOrder(userId: number, dto: CouponDto) {
    let totalAmount = 0;
    let redeemCoupon: Array<any>;
    let coupons: Array<any>;
    let priceNow: number;
    let couponStripe: Stripe.Response<Stripe.Coupon>;
    let session: Stripe.Response<Stripe.Checkout.Session>;
    const currentTime = new Date();

    //check coupon
    coupons = await this.prisma.coupons.findMany({
      where: {
        promocode: dto.promocode || '',
        isActive: true,
        startAt: { lt: currentTime },
        endAt: { gt: currentTime },
        NOT: {
          quantity: 0,
        },
      },
      select: {
        id: true,
        discountAmount: true,
        quantity: true,
      },
    });

    if (dto.promocode) {
      if (coupons.length === 0) {
        return;
      }

      if (!!coupons && coupons.length > 0) {
        const _redeemCoupon = await this.prisma.redeemCoupons.create({
          data: {
            userId: userId,
            couponId: coupons[0].id,
          },
        });

        // await this.prisma.coupons.updateMany({
        //   where: {},
        //   data: {
        //     quantity: coupons[0].quantity - 1,
        //   },
        // });
      }
      //check redeem coupon by coupon.id
      redeemCoupon = await this.prisma.redeemCoupons.findMany({
        where: {
          userId: userId,
          couponId: coupons[0]?.id,
        },
      });

      if (redeemCoupon.length === 0 || redeemCoupon[0].isUsed === true) {
        return;
      }
    }

    //calculate total amount
    const coursesInCart = await this.prisma.shoppingCarts.findMany({
      where: {
        userId: userId,
      },
      select: {
        courseId: true,
        course: {
          select: {
            sellingPrice: true,
            fundraisePrice: true,
            fundraiseStartDate: true,
            fundraiseEndDate: true,
            courseStartDate: true,
            status: true,
          },
        },
      },
    });


    if (coursesInCart.length <= 0) {
      return;
    }


    for (let data of coursesInCart) {
      if (
        currentTime >= data.course.fundraiseStartDate &&
        currentTime <= data.course.fundraiseEndDate
      ) {
        priceNow = data.course.fundraisePrice;
      } else if (currentTime >= data.course.courseStartDate) {
        priceNow = data.course.sellingPrice;
      }
      totalAmount += priceNow;
    }

    const discount = coupons[0] ? coupons[0].discountAmount : 0;
    totalAmount -= discount;

    //create order
    const redeemCouponId = redeemCoupon ? redeemCoupon[0].id : null;
    const order = await this.prisma.courseOrders.create({
      data: {
        userId: userId,
        paymentMethod: 'visa',
        totalAmount: totalAmount,
        redeemCouponId: redeemCouponId,
      },
    });

    for (let data of coursesInCart) {
      if (
        currentTime >= data.course.fundraiseStartDate &&
        currentTime <= data.course.fundraiseEndDate
      ) {
        const orderDetails = await this.prisma.courseOrderDetails.create({
          data: {
            courseOrderId: order.id,
            courseId: data.courseId,
            course_price: data.course.fundraisePrice,
            coursesStatus: data.course.status,
          },
        });
      } else if (currentTime >= data.course.courseStartDate) {
        const orderDetails = await this.prisma.courseOrderDetails.create({
          data: {
            courseOrderId: order.id,
            courseId: data.courseId,
            course_price: data.course.sellingPrice,
            coursesStatus: data.course.status,
          },
        });
      }
    }

    //get orderDetails
    const orderDetails = await this.prisma.courseOrderDetails.findMany({
      where: {
        courseOrderId: order.id,
      },
      select: {
        course_price: true,
        course: {
          select: {
            name: true,
          },
        },
      },
    });

    // items for Stripe

    const itemsForStripe = await Promise.all(
      orderDetails.map(async (e) => {
        return {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: e.course.name,
            },
            unit_amount: e.course_price * 100,
          },
          quantity: 1,
        };
      })
    );

    if (coupons.length > 0) {
      couponStripe = await this.stripe.coupons.create({
        amount_off: coupons[0]?.discountAmount * 100,
        duration: 'once',
        currency: 'hkd',
      });
      session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        discounts: [
          {
            coupon: couponStripe.id,
          },
        ],
        line_items: itemsForStripe,
        success_url: `${process.env.FRONTEND}/paymentSuccess/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND}/shoppingCart/`,
        metadata: {
          orderId: order.id,
          couponId: coupons[0]?.id,
        },
      });
    } else {
      session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: itemsForStripe,
        success_url: `${process.env.FRONTEND}/paymentSuccess/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND}/shoppingCart/`,
        metadata: {
          orderId: order.id,
          couponId: coupons[0]?.id,
        },
      });
    }

    return { couponId: coupons[0]?.id, orderId: order.id, url: session.url };
  }

  async paymentSuccess(userId: number, couponId: number, orderId: number) {
    // delete cart record, delete coupon if payment success, ((((change status to success of receipt!!!!)))/////////
    await this.prisma.shoppingCarts.deleteMany({
      where: {
        userId: userId,
      },
    });
    await this.prisma.redeemCoupons.updateMany({
      where: {
        userId: userId,
        couponId: couponId,
      },
      data: {
        isUsed: true,
      },
    });

    await this.prisma.courseOrders.updateMany({
      where: {
        id: orderId,
      },
      data: {
        status: 'successed',
      },
    });
    return { message: 'payment success' };
  }

  async editUserProfile(
    userId: number,
    editUserProfileDto: EditUserProfileDto,
    file?: Express.Multer.File
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || user.id !== userId) throw new ForbiddenException('The user does not exist!');

    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        username: editUserProfileDto.username,
      },
    });

    if (file) {
      const imageName = file.originalname.split('.')[0];
      const imageExtension = file.originalname.split('.')[1];
      const imageKey =
        'image/' + (imageName.split(' ').join('_') + '_' + Date.now() + '.' + imageExtension);
      const imageUrl: string = await this.s3Service.uploadImageFile(file, imageKey);

      await this.prisma.userProfiles.updateMany({
        where: {
          userId: userId,
        },
        data: {
          icon: imageUrl,
          description: editUserProfileDto.description,
        },
      });
    } else {
      await this.prisma.userProfiles.updateMany({
        where: {
          userId: userId,
        },
        data: {
          description: editUserProfileDto.description,
        },
      });
    }
    const updatedUser = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        userProfiles: {
          select: {
            icon: true,
            description: true,
          },
        },
      },
    });

    return { message: 'user updated successfully', updatedUser };
  }

  async resetUserPassword(userId: number, resetPasswordDto: ResetUserPassword) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.id !== userId) throw new ForbiddenException('The user does not exist!');

    const hashedPassword = await argon.hash(resetPasswordDto.password);

    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return user;
  }

  async getReviewedCourse(userId: number, courseId: number) {
    const reivewedCourse = await this.prisma.reviews.findMany({
      where: {
        userId,
        courseId,
      },
      select: {
        content: true,
        courseRating: true,
        courseId: true,
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
    return reivewedCourse;
  }

  async getOrderedCourses(userId: number) {
    let returnObj: Course[] = [];
    let courseVideoNumber = 0;
    const currentTime = new Date();
    let currentPrice: number;
    let rating = 0;
    let category = {};

    const orderedCourses = await this.prisma.courseOrders.findMany({
      where: {
        userId,
        status: 'successed',
      },
      select: {
        id: true,
        courseOrderDetails: {
          select: {
            id: true,
            course: {
              select: {
                id: true,
                name: true,
                courseImage: true,
                courseIntroVideo: true,
                courseTotalDuration: true,
                courseStartDate: true,
                fundraiseStartDate: true,
                fundraiseEndDate: true,
                fundraisePrice: true,
                longDescription: true,
                shortDescription: true,
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
          },
        },
      },
    });
    if (orderedCourses.length === 0) {
      throw { message: 'no ordered course' };
    }

    orderedCourses.forEach((order, i) => {
      order.courseOrderDetails.forEach((e) => {
        courseVideoNumber = 0;
        e.course.chapters.forEach((chapter) => {
          courseVideoNumber += chapter.sections.length;
        });
        e.course.reviews.forEach((e) => {
          rating += +e.courseRating;
        });
        e.course.categoriesCoursesMap.forEach((e) => {
          category = e.catrgory;
        });

        returnObj[i] = {} as Course;
        returnObj[i].id = e.course.id;
        returnObj[i].name = e.course.name;
        returnObj[i].duration = e.course.courseTotalDuration;
        returnObj[i].classmate = order.courseOrderDetails.length;
        returnObj[i].image = e.course.courseImage;
        returnObj[i].category = category ?? null;
        if (
          currentTime >= e.course.fundraiseStartDate &&
          currentTime <= e.course.fundraiseEndDate
        ) {
          currentPrice = e.course.fundraisePrice;
        } else {
          currentPrice = e.course.sellingPrice;
        }
        returnObj[i].price = currentPrice;
        returnObj[i].videoNum = courseVideoNumber;
        returnObj[i].rating = rating / e.course.reviews.length;
        returnObj[i].review = e.course.reviews.length;
      });
    });
    return returnObj;
  }
}

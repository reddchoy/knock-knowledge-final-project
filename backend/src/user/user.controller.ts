import { CouponDto } from './dto/useCoupon.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ParseIntPipe,
  Logger,
  Delete,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Req,
  Put,
  HttpCode,
  Res,
  HttpException,
  HttpStatus,
  Redirect,
  Query,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { GetUser, isAdmin } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditUserProfileDto, ResetUserPassword } from './dto/edit-user-profile.dto';
import Stripe from 'stripe';

@Controller('user')
export class UserController {
  private stripe: Stripe;

  constructor(private userService: UserService) {
    this.stripe = new Stripe(process.env.STRIPE_PRIVATE, {
      apiVersion: '2022-11-15',
    });
  }

  @Get() // POST, GET, PUT, DELETE
  getData(): string {
    return this.userService.callDb();
  }

  @Get('getUser')
  getUser() {
    try {
      return this.userService.getUser();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('getCurrentUser')
  getCurrentUser(@GetUser('id') userId: number) {
    try {
      return this.userService.getCurrentUser(userId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('getUserAndCart')
  async getUserAndCart(@GetUser('id') userId: number) {
    try {
      const resp = await this.userService.getUserAndCart(userId);
      return { message: resp };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('check/order/:id')
  async checkOrder(@GetUser('id') userId: number, @Param('id') courseId: number) {
    try {
      const order = await this.userService.checkUserOrder(userId, courseId);
      return { message: true };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getUserProfile(@GetUser('id') userId: number) {
    try {
      const data = await this.userService.getUserProfile(userId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('work')
  async getUserWork(@GetUser('id') userId: number) {
    try {
      const data = await this.userService.getUserWork(userId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('article')
  async getUserArticle(@GetUser('id') userId: number) {
    try {
      const data = await this.userService.getUserArticle(userId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('bookmark')
  async getUserBookMark(@GetUser('id') userId: number) {
    try {
      const data = await this.userService.getUserBookMark(userId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('shoppingCart/check/:courseId')
  async checkToCartByItemsId(
    @Param('courseId', ParseIntPipe) courseId: number,
    @GetUser('id') userId: number
  ) {
    try {
      const returnValue = await this.userService.checkToShoppingCart(userId, courseId);
      return { message: true };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('shoppingCart/add/:courseId')
  async addToCartByItemsId(
    @Param('courseId', ParseIntPipe) courseId: number,
    @GetUser('id') userId: number
  ) {
    try {
      const returnValue = await this.userService.addToShoppingCart(userId, courseId);
      if (!returnValue) {
        return { message: 'course added already' };
      }
      return { message: 'course added' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('shoppingCart/delete/:cartCourseId')
  deleteCartCourse(
    @Param('cartCourseId', ParseIntPipe) cartCourseId: number,
    @GetUser('id') userId: number
  ) {
    try {
      this.userService.deleteShoppingCartCourse(userId, cartCourseId);
      return { message: 'shopping cart course deleted' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('order/create')
  async createOrder(@GetUser('id') userId: number, @Body() dto: CouponDto) {
    try {
          const data = await this.userService.createOrder(userId, dto);
    if (data === undefined) {
      throw new HttpException('no courses in cart', HttpStatus.BAD_REQUEST);
    }
    return { message: 'transaction created', paymentUrl: data.url };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Put('order/success')
  async orderSuccess(@GetUser('id') userId: number, @Query('session_id') session_id: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(session_id);
      const data = session.metadata;
      const res = await this.userService.paymentSuccess(
        userId,
        +data.couponId || undefined,
        +data.orderId
      );
      return { res, orderId: data.orderId, couponId: data.couponId };
    } catch (e) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This is a custom message',
        message: 'Payment Failure',
      });
    }
  }

  @UseGuards(JwtGuard)
  @Delete('redeem/coupon')
  async delFalseRedeemCoupon(
    @GetUser('id')
    userId: number
  ) {
    try {
          await this.userService.delFalseRedeemCoupon(userId);
    return { message: 'false redeem coupon deleted' };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('redeem/coupon')
  async getRedeemCoupon(
    @GetUser('id')
    userId: number
  ) {
    try {
          const resp = await this.userService.getRedeemCoupons(userId);
    if (resp.length === 0) {
      throw new HttpException('no coupon', HttpStatus.BAD_REQUEST);
    }
    return resp;
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('redeem/coupon')
  async redeemCoupon(@GetUser('id') userId: number, @Body() dto: CouponDto) {
    try {
      const resp = await this.userService.redeemCoupon(userId, dto);
      // if (!resp) {
      //   throw new HttpException(
      //     'u have this coupon already or wrong promoCode or no more coupon',
      //     HttpStatus.BAD_REQUEST
      //   );
      // }
      return { message: 'got coupon success', coupon: resp };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('cart/courses')
  async getCartCourses(@GetUser('id') userId: number) {
    try {
          const cart = await this.userService.getCartCourses(userId);
    // if (cart.length === 0) {
    //   throw new HttpException('no items in cart', HttpStatus.BAD_REQUEST);
    // }
    return cart;
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('order/orderDetail/:id')
  async getOrderAndDetail(
    @Param('id') orderId: number
    // @GetUser('id') userId: number
  ) {
    try {
          const orderDetail = await this.userService.getOrderAndDetail(orderId);
    // if (cart.length === 0) {
    //   throw new HttpException('no items in cart', HttpStatus.BAD_REQUEST);
    // }
    return orderDetail;
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('courses')
  async getOwnerCourses(@GetUser('id') userId: number) {
    const resp = await this.userService.getOwnerCourses(userId);
    return resp;
  }

  @UseGuards(JwtGuard)
  @Get('order')
  async getOrders(@GetUser('id') userId: number) {
    try {
      const resp = await this.userService.getOrders(userId);
      return resp;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('profile/edit/')
  @UseInterceptors(FileInterceptor('icon'))
  editUserProfile(
    @Body() editUserProfileDto: EditUserProfileDto,
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser('id') userId: number
  ) {
    try {
        if (file) {
      return this.userService.editUserProfile(userId, editUserProfileDto, file);
    } else {
      return this.userService.editUserProfile(userId, editUserProfileDto);
    }
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Patch('password/reset/')
  resetUserPassword(@Body() resetPasswordDto: ResetUserPassword, @GetUser('id') userId: number) {
    try {
      return this.userService.resetUserPassword(userId, resetPasswordDto);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('review/:courseId')
  async userReview(
    @GetUser('id') userId: number,
    @Param('courseId', ParseIntPipe) courseId: number
  ) {
    try {
      const userReviewedCourse = await this.userService.getReviewedCourse(userId, courseId);
      return userReviewedCourse;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Get('orderedCourses')
  async getOrderedCourses(@GetUser('id') userId: number) {
    try {
      const orderedCourses = await this.userService.getOrderedCourses(userId);
      return orderedCourses;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

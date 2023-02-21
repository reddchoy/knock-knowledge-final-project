import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RegisterDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    // generate the password hash
    const hashedPassword = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.users.create({
        data: {
          username: dto.username,
          password: hashedPassword,
          phoneNumber: dto.phoneNumber,
          email: dto.email,
          userProfiles: {
            create:{
              icon: null
            }
          }
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials has been taken!');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    // find the user by email
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect!');
    // compare password
    const checkPassword = await argon.verify(user.password, dto.password);
    // if password incorrect throw execption
    if (!checkPassword) throw new ForbiddenException('Credentials incorrect!');

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async googleLogin({ email }: { email: string }): Promise<any> {
    const userExists = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    let uuid = uuidv4();
    let randomPassword = uuid + email;

    const hashedPassword = await argon.hash(randomPassword);

    if (!userExists) {
      const createdUser = await this.prisma.users.create({
        data: {
          email: email,
          password: hashedPassword,
          phoneNumber: null,
          username: email,
          userProfiles: {
            create: {
              icon: null
            }
          }
        },
      });

      return this.signToken(createdUser.id, createdUser.email);
    } else {
      return this.signToken(userExists.id, userExists.email);
    }
  }
}

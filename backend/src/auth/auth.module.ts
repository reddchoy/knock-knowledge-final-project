import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "./../prisma/prisma.module";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

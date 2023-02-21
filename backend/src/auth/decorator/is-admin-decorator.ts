import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const isAdmin = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  if(!request?.user['isAdmin'] || request.user['isAdmin']== false){
    throw new UnauthorizedException('not admin')
  }
  return request.user['isAdmin']
});

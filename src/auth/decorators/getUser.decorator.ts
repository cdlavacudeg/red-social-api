import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  // Decorator to extract the user data  that is passed in by passport jwt strategy in request.user
  const request = ctx.switchToHttp().getRequest();
  if (data) {
    // Especify what data to return
    return request.user[data];
  }
  return request.user;
});

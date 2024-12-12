import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from 'src/auth/auth.service';

export const ExtractToken = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return await extractTokenFromHeader(request);
  },
);

async function extractTokenFromHeader(request: ExpressRequest) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return undefined;
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    return undefined;
  }
  // token = token + '131';

  const jwtService = new JwtService();

  const decodeToken: UserAuth = await jwtService.decode(token);
  return decodeToken;
}

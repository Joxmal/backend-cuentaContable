import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constanst/jwt-contanst';
import { JwtStrategy } from './constanst/jwt-strategy';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],

  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('auth');
  }
}

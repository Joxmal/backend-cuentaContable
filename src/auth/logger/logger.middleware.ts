import { Injectable, NestMiddleware } from '@nestjs/common';
/* import { Request, Response } from 'express'; */

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    /* console.log('middleware Loggin: ', req.originalUrl); */
    next();
  }
}

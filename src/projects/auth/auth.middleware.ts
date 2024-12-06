import { ForbiddenException, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const {authorization} = req.headers;

    console.log(authorization)

    if(!authorization){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    if(authorization !== 'xyz123'){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    next();
  }
}

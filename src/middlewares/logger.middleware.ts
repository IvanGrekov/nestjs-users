import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, baseUrl, url } = req;
    console.log(`Request: ${method} ${baseUrl}${url}`);
    next();
  }
}

export function logger(req: Request, res: Response, next: () => void) {
  const { method, baseUrl, url } = req;
  console.log(`Functional Middleware. Request: ${method} ${baseUrl}${url}`);
  next();
}

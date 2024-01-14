import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).send({
      timestamp: new Date().toISOString(),
      isError: true,
      status: exception.getStatus(),
      path: request.url,
      method: request.method,
      message: exception.message,
    });
  }
}

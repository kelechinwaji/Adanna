import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Boom } from 'boom';

@Catch()
export class BoomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (Boom.isBoom(exception)) {
      const { statusCode, payload } = exception.output || exception;
      const { error, message, statusCode: boomStatusCode } = payload;

      response
        .status(boomStatusCode || statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: boomStatusCode || statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          error,
          message,
        });
    } else {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: exception.message,
        });
    }
  }
}

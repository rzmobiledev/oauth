import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
} from 'generated/prisma/runtime/library';

type ResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseObj: ResponseObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      responseObj.statusCode = exception.getStatus();
      responseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      responseObj.statusCode = 422;
      responseObj.response = exception.message.replaceAll(/\n/g, '');
    } else if (exception instanceof PrismaClientKnownRequestError) {
      responseObj.statusCode = 422;
      responseObj.response = exception.message.replaceAll(/\n/g, '');
    } else {
      responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseObj.response = String(exception);
    }
    response.status(responseObj.statusCode).json(responseObj);
  }
}

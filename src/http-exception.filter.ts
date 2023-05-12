// global-exception.filter.ts
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { IncomingMessage } from 'http';
  
  export const getStatusCode = <T>(exception: T): number => {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  };

  export interface HttpExceptionResponse {
    statusCode: number;
    message: any;
    error: string;
  }
  
  export const getErrorMessage = <T>(exception: T): any => {

    if(exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      const errorMessage = (errorResponse as HttpExceptionResponse).message || exception.message;
      return Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;
    } else {
      return String(exception);
    }
  };

  
  
  @Catch()
  export class GlobalExceptionFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<IncomingMessage>();
      const statusCode = getStatusCode<T>(exception);
      const message = getErrorMessage<T>(exception);
  
      response.status(statusCode).json({
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
        
      });
    }
  }
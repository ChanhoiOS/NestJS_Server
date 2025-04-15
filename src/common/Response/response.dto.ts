import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T = any> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;

  constructor(success: boolean, message: string, statusCode: number, data?: T) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    if (data !== undefined) this.data = data;
  }

  static success<T>(
    data: T,
    message = '성공',
    statusCode = HttpStatus.OK,
  ): ResponseDto<T> {
    return new ResponseDto(true, message, statusCode, data);
  }

  static fail(
    message = '실패',
    statusCode = HttpStatus.BAD_REQUEST,
  ): ResponseDto<null> {
    return new ResponseDto(false, message, statusCode, null);
  }
}


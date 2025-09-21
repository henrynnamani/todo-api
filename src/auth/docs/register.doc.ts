import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';

import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  token: string;
}

export class ErrorResponseDto {
  @ApiProperty({ example: 'Error happened' })
  message: string;
}

export const registerDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Register user',
    }),
    ApiBody({
      type: RegisterDto,
    }),
    ApiResponse({
      status: 201,
      description: 'User successfully registered',
      type: AuthResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input data',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 409,
      description: 'User already exists',
      type: ErrorResponseDto,
    }),
  );

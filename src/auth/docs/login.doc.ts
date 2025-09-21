import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto, ErrorResponseDto } from './register.doc';

export const loginDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Login',
    }),
    ApiBody({
      type: LoginDto,
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

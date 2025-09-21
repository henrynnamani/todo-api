import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto, ErrorResponseDto } from './register.doc';
import { RefreshDto } from '../dto/refresh.dto';

export const refreshDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Refresh',
    }),
    ApiBody({
      type: RefreshDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Refresh token',
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

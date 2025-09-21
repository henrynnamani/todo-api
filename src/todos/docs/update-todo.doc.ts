import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { ErrorResponseDto } from 'src/auth/docs/register.doc';

export const updateTodoDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update Todo',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdateTodoDto,
    }),
    ApiResponse({
      status: '2XX',
      type: CreateTodoDto,
    }),
    ApiResponse({
      status: '4XX',
      type: ErrorResponseDto,
    }),
  );

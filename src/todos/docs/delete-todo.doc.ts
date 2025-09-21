import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { ErrorResponseDto } from 'src/auth/docs/register.doc';

export const deleteTodoDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete Todo',
    }),
    ApiBearerAuth(),
    ApiParam({
      name: 'id',
      example: 'todo-id',
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

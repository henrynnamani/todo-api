import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateTodoDto } from '../dto/create-todo.dto';

export class TodoResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;
  @ApiProperty({ example: 'Learn to act foolish' })
  title: string;
  @ApiProperty({
    example: 'It foosters learning, and make the unknown unknowns known',
  })
  description: string;
}

export const createTodoDoc = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create Todo',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: CreateTodoDto,
    }),
    ApiResponse({
      type: TodoResponseDto,
    }),
  );

import {
  ApiBearerAuth,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export class GetTodosResponseDto {
  @ApiPropertyOptional({ type: [CreateTodoDto] })
  data: CreateTodoDto[];

  @ApiPropertyOptional({ example: 1 })
  page: number;

  @ApiPropertyOptional({ example: 10 })
  limit: number;

  @ApiPropertyOptional({ example: 2 })
  total: number;
}

export const getTodosDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get paginated list of todos' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'List of todos with pagination metadata',
      type: GetTodosResponseDto,
    }),
  );

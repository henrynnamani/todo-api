import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(
  PickType(CreateTodoDto, ['description', 'title'] as const),
) {
  @ApiProperty({
    example: 'Walk the dog',
    description: 'todo title',
  })
  title: string;

  @ApiProperty({
    example: 'blah blah blah',
    description: 'todo description',
  })
  description: string;
}

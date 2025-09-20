import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(
  PickType(CreateTodoDto, ['description', 'title'] as const),
) {}

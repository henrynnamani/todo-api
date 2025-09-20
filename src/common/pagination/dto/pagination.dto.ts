import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { GetTodosDto } from 'src/todos/dto/get-todos.dto';

export class PaginationDto extends GetTodosDto {}

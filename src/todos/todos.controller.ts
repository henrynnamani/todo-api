import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosDto } from './dto/get-todos.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetAuthenticatedUser } from 'src/auth/decorator/get-user.decorator';
import { OwnerGuard } from 'src/auth/guards/owner.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('')
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetAuthenticatedUser() user: { sub: string },
  ) {
    return this.todosService.createTodo(createTodoDto, user.sub);
  }

  @Get('')
    getTodos(@Query() getTodosQuery: GetTodosDto) {
      return this.todosService.getTodos(getTodosQuery);
    }

  @Put(':id')
  @UseGuards(OwnerGuard)
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}

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
import { createTodoDoc } from './docs/create-todo.doc';
import { getTodosDoc } from './docs/get-todos.doc';
import { updateTodoDoc } from './docs/update-todo.doc';
import { deleteTodoDoc } from './docs/delete-todo.doc';
import { ApiTags } from '@nestjs/swagger';

@Controller('todos')
@ApiTags('Todo')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @createTodoDoc()
  @Post('')
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetAuthenticatedUser() user: { sub: string },
  ) {
    return this.todosService.createTodo(createTodoDto, user.sub);
  }

  @getTodosDoc()
  @Get('')
  getTodos(@Query() getTodosQuery: GetTodosDto) {
    return this.todosService.getTodos(getTodosQuery);
  }

  @updateTodoDoc()
  @Put(':id')
  @UseGuards(OwnerGuard)
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo(id, updateTodoDto);
  }

  @deleteTodoDoc()
  @Delete(':id')
  @UseGuards(OwnerGuard)
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}

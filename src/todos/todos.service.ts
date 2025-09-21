import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './model/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DB_CONNECTION_ERROR } from 'src/common/system-message';
import { GetTodosDto } from './dto/get-todos.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly paginationService: PaginationService,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, userId: string) {
    try {
      const todo = this.todoRepository.create({
        ...createTodoDto,
        user: { id: userId },
      });

      const newTodo = await this.todoRepository.save(todo);

      const { user, ...todoWithoutUser } = newTodo;

      return todoWithoutUser;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async getTodos(getTodosQuery: GetTodosDto) {
    const { filter } = getTodosQuery;
    try {
      const queryBuilder = this.todoRepository.createQueryBuilder('todos');

      if (filter) {
        queryBuilder.andWhere('todos.title LIKE :title', {
          title: `%${filter}%`,
        });
      }

      return this.paginationService.paginate(queryBuilder, getTodosQuery);
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.checkTodoExist(id);

      const result = this.todoRepository.update(todo.id, updateTodoDto);

      if ((await result).affected === 0) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }

      const updatedTodo = await this.todoRepository.findOne({
        where: { id: todo.id },
      });

      return updatedTodo;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async deleteTodo(id: string) {
    try {
      return await this.todoRepository.delete(id);
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async checkTodoExist(id: string): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!todo) {
        throw new NotFoundException();
      }

      return todo;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }
}

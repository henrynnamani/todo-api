import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TodosService } from 'src/todos/todos.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly todoService: TodosService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const todoId = request.params.id;

    const todo = await this.todoService.checkTodoExist(todoId);

    if (todo.user.id !== user.sub) {
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    }

    return true;
  }
}

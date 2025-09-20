import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './model/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule],
  controllers: [TodosController],
  providers: [TodosService, PaginationService],
})
export class TodosModule {}

import { BaseModel } from 'src/common/base-model';
import { Todo } from 'src/todos/model/todo.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}

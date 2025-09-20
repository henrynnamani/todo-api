import { BaseModel } from 'src/common/base-model';
import { User } from 'src/user/model/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('todos')
export class Todo extends BaseModel {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' })
  user: User;
}

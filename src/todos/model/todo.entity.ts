import { BaseModel } from 'src/common/base-model';
import { Column, Entity } from 'typeorm';

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
}

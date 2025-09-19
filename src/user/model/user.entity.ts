import { BaseModel } from 'src/common/base-model';
import { Column, Entity } from 'typeorm';

@Entity('user')
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
}

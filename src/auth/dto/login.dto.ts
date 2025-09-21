import { PickType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends PickType(RegisterDto, [
  'email',
  'password',
] as const) {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  password: string;
}

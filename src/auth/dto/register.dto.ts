import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Anita',
    description: 'Name of user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'belinda@gmail.com',
    description: 'Email of user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Py_r@hornet92381',
    description: 'Password of user',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Head to Salon',
    description: 'Todo title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Drive down to Ajah valley and get a cut.',
    description: 'todo description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

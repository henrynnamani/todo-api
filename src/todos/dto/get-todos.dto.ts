import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTodosDto {
  @ApiPropertyOptional({
    example: 2,
    description: 'Page number',
  })
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({
    example: 15,
    description: 'Page limit',
  })
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;

  @ApiPropertyOptional({
    example: 'title',
    description: 'String to filter by',
  })
  @IsString()
  @IsOptional()
  filter: string;

  @ApiPropertyOptional({
    example: 'title',
    description: 'string to sort by',
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'title';

  @ApiPropertyOptional({
    example: 'ASC',
    description: 'How to sort order by?',
  })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}

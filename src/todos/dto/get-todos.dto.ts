import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTodosDto {
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  limit: number = 10;

  @IsString()
  @IsOptional()
  filter: string;

  @IsString()
  @IsOptional()
  sortBy?: string = 'title';

  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}

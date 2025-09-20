import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { PaginationResponseDto } from './pagination';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  constructor() {}

  async paginate<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<T>> {
    const { limit, page, sortBy, sortOrder } = paginationDto;
    const skip = (page! - 1) * limit!;

    console.log(sortOrder);

    queryBuilder.skip(skip).take(limit);

    if (sortBy) {
      queryBuilder.orderBy(`todos.${sortBy}`, sortOrder);
    }

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      data: results,
      total,
      page,
      limit,
    };
  }
}

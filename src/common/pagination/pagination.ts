export class PaginationResponseDto<T> {
  data: T[];
  total: number;
  page: number | undefined;
  limit: number | undefined;

  constructor(data: T[], total: number, currentPage: number, limit: number) {
    this.data = data;
    this.total = total;
    this.page = currentPage;
    this.limit = limit;
  }
}

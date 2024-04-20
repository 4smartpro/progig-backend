import { InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  searchText: string;
  limit: number;
  page: number;
}

import { Contract } from '@app/common';
import { PaginationDto } from '@app/common/util/default.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class GetContractsDto extends PaginationDto {
  userId?: string;
  asContractor?: boolean;
}

@ObjectType()
export class ContractsResponse {
  @Field(() => [Contract])
  entries: Contract[];

  @Field(() => Int)
  total: number;
}

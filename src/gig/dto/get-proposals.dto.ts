import { Proposal } from '@app/common';
import { PaginationDto } from '@app/common/util/default.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProposalsResponse {
  @Field(() => [Proposal])
  entries: Proposal[];

  @Field(() => Int)
  total: number;
}

@InputType()
export class GetMyProposalDto extends PaginationDto {
  helperId: string;
}

import { Contract, Proposal } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AcceptProposalResponse {
  @Field(() => Proposal)
  proposal: Proposal;

  @Field(() => Contract)
  contract: Contract;
}

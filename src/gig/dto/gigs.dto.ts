import { Gig } from '@app/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GigsResponse {
  @Field(() => [Gig])
  entries: Gig[];

  @Field(() => Int)
  total: number;
}

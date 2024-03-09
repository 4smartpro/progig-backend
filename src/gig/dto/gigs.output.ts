import { Field, ObjectType } from '@nestjs/graphql';
import { Gig } from '../entities/gig.entity';

@ObjectType()
export class GigsResponse {
  @Field(() => [Gig])
  entries: Gig[];

  @Field()
  total: number;
}

import { Connection } from '@app/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConnectionsResponse {
  @Field(() => [Connection])
  entries: Connection[];

  @Field(() => Int)
  total: number;
}

import { Connection } from '@app/common';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ConnectionType {
  FOLLOWING = 'FOLLOWING',
  FOLLOWER = 'FOLLOWER',
}

registerEnumType(ConnectionType, { name: 'ConnectionType' });

@ObjectType()
export class ConnectionsResponse {
  @Field(() => [Connection])
  entries: Connection[];

  @Field(() => Int)
  total: number;
}

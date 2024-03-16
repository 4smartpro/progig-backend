import { Chat } from '@app/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatsResponse {
  @Field(() => [Chat])
  entries: Chat[];

  @Field(() => Int)
  total: number;
}

import { Message } from '@app/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConversationsResponse {
  @Field(() => [Message])
  entries: Message[];

  @Field(() => Int)
  total: number;
}

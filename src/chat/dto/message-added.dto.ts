import { Chat, Message } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => Message)
  message: Message;

  @Field(() => Chat)
  chat: Chat;
}

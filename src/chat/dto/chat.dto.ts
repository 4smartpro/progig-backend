import { Chat, Message, User } from '@app/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatsResponse {
  @Field(() => [Chat])
  entries: Chat[];

  @Field(() => Int)
  total: number;
}

// @ObjectType()
// export class Contact {
//   @Field(() => ID)
//   id: string;

//   @Field()
//   createdAt: Date;

//   @Field()
//   updatedAt: Date;

//   @Field(() => User, { nullable: true })
//   user?: User;

//   @Field(() => Message, { nullable: true })
//   lastMessage: Message;
// }

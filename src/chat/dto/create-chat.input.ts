import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => ID, { description: 'Receiver ID' })
  receiverId: string;

  @Field()
  message: string;
}

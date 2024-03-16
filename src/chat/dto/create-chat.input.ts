import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => ID, { description: 'Chat ID (Optional)', nullable: true })
  chatId: string;

  @Field(() => ID, { description: 'Receiver ID (Optional)', nullable: true })
  receiverId: string;

  @Field()
  message: string;
}

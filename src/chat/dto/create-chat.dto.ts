import { Upload } from '@app/common';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => ID, { description: 'Receiver ID (Optional)', nullable: true })
  receiverId: string;

  @Field({ nullable: true })
  message?: string;

  attachment?: string;

  @Field(() => Upload, { nullable: true })
  file?: Upload;
}

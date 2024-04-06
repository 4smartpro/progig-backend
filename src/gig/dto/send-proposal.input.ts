import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendProposalInput {
  @Field(() => String, { description: 'Mandatory Field' })
  coverLetter: string;

  @Field(() => String, { description: 'Mandatory Field' })
  gigId: string;
}

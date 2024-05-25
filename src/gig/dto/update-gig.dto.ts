import { CreateGigInput } from './create-gig.dto';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateGigInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: 'Mandatory Field' })
  title: string;

  @Field(() => String, { description: 'Mandatory Field' })
  description: string;

  @Field()
  budget: number;

  @Field(() => Date, { description: 'Mandatory Field' })
  deadline: Date;

  @Field({ nullable: true })
  requirements: string;

  @Field({ nullable: true })
  paymentMethod: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  jobType: string;
}

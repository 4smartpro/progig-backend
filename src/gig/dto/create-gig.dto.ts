import { Upload } from '@app/common';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGigInput {
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
  paymentType: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  jobType: string;

  @Field(() => [Upload], { nullable: true })
  images: Upload[];
}

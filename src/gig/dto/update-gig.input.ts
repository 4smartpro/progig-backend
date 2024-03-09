import { CreateGigInput } from './create-gig.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGigInput extends PartialType(CreateGigInput) {
  @Field(() => Int)
  id: string;
}

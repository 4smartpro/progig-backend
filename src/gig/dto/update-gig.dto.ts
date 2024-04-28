import { CreateGigInput } from './create-gig.dto';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateGigInput extends PartialType(CreateGigInput) {
  @Field(() => ID)
  id: string;
}

import { CreateGigInput } from './create-gig.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGigInput extends PartialType(CreateGigInput) {
  @Field(() => Int)
  id: string;
}

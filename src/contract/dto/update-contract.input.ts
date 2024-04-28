import { Contract } from '@app/common';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateContractInput extends PartialType(Contract) {
  @Field(() => ID)
  id: string;
}

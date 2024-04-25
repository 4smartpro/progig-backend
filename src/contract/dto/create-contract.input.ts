import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContractInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

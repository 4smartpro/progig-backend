import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  company: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  phone: string;
}

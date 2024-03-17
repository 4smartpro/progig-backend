import { User } from '@app/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersResponse {
  @Field(() => [User])
  entries: User[];

  @Field(() => Int)
  total: number;
}

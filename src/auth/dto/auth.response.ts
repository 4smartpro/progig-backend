import { User } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}

@ObjectType()
export class RegistrationResponse {
  @Field()
  message: string;

  @Field()
  user: User;
}

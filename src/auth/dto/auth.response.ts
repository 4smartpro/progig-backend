import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

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

@ObjectType()
export class UserResponse {
  @Field()
  email: string;
}

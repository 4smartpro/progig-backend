import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

@InputType()
export class RegistrationInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

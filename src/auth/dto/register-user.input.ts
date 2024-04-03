import { UserRole } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';

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

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  company: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  phone: string;
}

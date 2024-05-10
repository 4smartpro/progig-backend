import { Upload } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  company: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  zipcode: string;

  profilePicture?: string;

  @Field(() => Upload, { nullable: true })
  profilePictureFile: Upload;
}

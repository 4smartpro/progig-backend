import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AbstractEntity } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  CONTRACTOR = 'CONTRACTOR',
  HELPER = 'HELPER',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends AbstractEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstname: string;

  @Field()
  @Column({ nullable: true })
  lastname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ nullable: true })
  location: string;

  @Field()
  @Column({ nullable: true })
  bio: string;

  @Field()
  @Column({ enum: UserRole })
  role: string;

  @Field()
  @Column({ nullable: true })
  profilePicture: string;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  isPasswordMatched(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

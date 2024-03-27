import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AbstractEntity } from '../abstract.entity';

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  company: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  category: string;

  @Field(() => UserRole)
  @Column({
    default: UserRole.HELPER,
    enum: UserRole,
    type: 'enum',
  })
  role: UserRole;

  @Field({ nullable: true })
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

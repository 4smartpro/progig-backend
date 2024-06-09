import { Entity, Column, BeforeInsert, OneToMany, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AbstractEntity } from '../abstract.entity';
import { Gig } from './gig.entity';
import { SavedGig } from './saved-gig.entity';

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
  state: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  zipcode: string;

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
  @Column({
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    nullable: true,
  })
  profilePicture: string;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Field(() => [Gig], { defaultValue: [] })
  @OneToMany(() => Gig, (p) => p.contractor)
  gigs: Gig[];

  @Field(() => [SavedGig], { defaultValue: [] })
  @OneToMany(() => SavedGig, (p) => p.user)
  savedGigs: SavedGig[];

  @BeforeInsert()
  async insertPassword() {
    if (this.password) {
      this.password = this.hashPassword(this.password);
    }
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  isPasswordMatched(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Content extends AbstractEntity {
  @Field()
  @Column()
  url: string;

  // @Field()
  @Column()
  user_id: string;

  // @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  ref: string;
}

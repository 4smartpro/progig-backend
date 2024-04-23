import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { Gig } from './gig.entity';

@ObjectType()
@Entity()
export class SavedGig extends AbstractEntity {
  @Field()
  @Column()
  gigId: string;

  @Field(() => Gig, { nullable: true })
  @ManyToOne(() => Gig, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @Field()
  @Column()
  userId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}

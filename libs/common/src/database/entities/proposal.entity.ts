import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Gig } from './gig.entity';
import { User } from './user.entity';
import { AbstractEntity } from '../abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DELETED = 'DELETED',
  REJECTED = 'REJECTED',
}

@Entity()
@ObjectType()
export class Proposal extends AbstractEntity {
  @Field()
  @Column()
  coverLetter: string;

  @Field()
  @Column()
  gigId: string;

  @Field(() => Gig, { nullable: true })
  @ManyToOne(() => Gig)
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @Field()
  @Column()
  helperId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'helperId' })
  helper: User;

  @Field()
  @Column({
    enum: ProposalStatus,
    default: ProposalStatus.PENDING,
    type: 'enum',
  })
  status: ProposalStatus;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Gig } from './gig.entity';
import { Proposal } from './proposal.entity';
import { User } from './user.entity';
import { AbstractEntity } from '../abstract.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

registerEnumType(ContractStatus, { name: 'ContractStatus' });

/**
 * To find any contract by user. it needs to find using gig and proposal.
 * - the owner of the gig is contractor
 * - the owner of the proposal is helper
 *
 * So if we need to find all contract of a helper then it needs to find
 * using helperId
 *
 * Similarly, if we need to find all contract of a contractor then it needs
 * to find using contractorId
 */

@ObjectType()
@Entity()
export class Contract extends AbstractEntity {
  @Field()
  @Column()
  gigId: string;

  @Field(() => Gig, { nullable: true })
  @ManyToOne(() => Gig)
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @Field()
  @Column()
  proposalId: string;

  @Field(() => Proposal, { nullable: true })
  @ManyToOne(() => Proposal)
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Field()
  @Column()
  helperId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'helperId' })
  helper: User;

  @Field()
  @Column()
  contractorId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Field(() => ContractStatus)
  @Column({
    enum: ContractStatus,
    default: ContractStatus.ACTIVE,
    type: 'enum',
  })
  status: ContractStatus;
}

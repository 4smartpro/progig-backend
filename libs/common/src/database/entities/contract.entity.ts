import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Gig } from './gig.entity';
import { Proposal } from './proposal.entity';
import { User } from './user.entity';
import { AbstractEntity } from '../abstract.entity';

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

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

@Entity()
export class Contract extends AbstractEntity {
  @Column()
  gigId: string;

  @ManyToOne(() => Gig)
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @Column()
  proposalId: string;

  @ManyToOne(() => Proposal)
  @JoinColumn({ name: 'proposalId' })
  proposal: Proposal;

  @Column()
  helperId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'helperId' })
  helper: User;

  @Column()
  contractorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ enum: ContractStatus, default: ContractStatus.ACTIVE })
  status: ContractStatus;
}

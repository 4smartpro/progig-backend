import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Gig } from './gig.entity';
import { User } from './user.entity';
import { AbstractEntity } from '../abstract.entity';

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DELETED = 'DELETED',
  DECLINED = 'DECLINED',
}

@Entity()
export class Proposal extends AbstractEntity {
  @Column()
  coverLetter: string;

  @Column()
  gigId: string;

  @ManyToOne(() => Gig)
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @Column()
  helperId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'helperId' })
  helper: User;

  @Column({ enum: ProposalStatus, default: ProposalStatus.PENDING })
  status: ProposalStatus;
}

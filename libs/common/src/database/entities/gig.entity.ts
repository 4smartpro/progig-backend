import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity, Proposal } from '@app/common';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.entity';
import { Content } from './content.entity';

export enum GigStatus {
  OPEN = 'OPEN',
  TAKEN = 'TAKEN',
}

registerEnumType(GigStatus, { name: 'GigStatus' });

@ObjectType()
@Entity()
export class Gig extends AbstractEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  budget: number;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: 'date' })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: 'date' })
  endDate: Date;

  @Field({ nullable: true })
  @Column({ default: 50 })
  maxProposal: number;

  @Field({ nullable: true, defaultValue: 0 })
  noOfProposals: number;

  @Field()
  @Column({ default: GigStatus.OPEN, type: 'enum', enum: GigStatus })
  status: GigStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  requirements: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paymentMethod: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paymentType: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobType: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field(() => [Content], { defaultValue: [] })
  @ManyToMany(() => Content)
  @JoinTable()
  images: Content[];

  @Field()
  @Column()
  contractorId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (c) => c.gigs)
  @JoinColumn({ name: 'contractorId' })
  contractor: User;

  @Field(() => [Proposal], { defaultValue: [] })
  @OneToMany(() => Proposal, (p) => p.gig)
  proposals: Proposal[];

  @Field(() => Boolean, { defaultValue: false })
  isSaved: boolean;

  // TODO: add new flag if proposal sent
}

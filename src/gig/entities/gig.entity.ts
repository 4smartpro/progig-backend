import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { User } from 'src/user/entities/user.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

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
  @Column()
  deadline: Date;

  @Field({ defaultValue: GigStatus.OPEN })
  @Column({ default: GigStatus.OPEN })
  status: GigStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  requirements: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paymentMethod: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobType: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field()
  @Column()
  contractorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'contractorId' })
  contractor: User;
}

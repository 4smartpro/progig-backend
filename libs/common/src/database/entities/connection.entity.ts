import { AbstractEntity } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@ObjectType()
@Entity()
export class Connection extends AbstractEntity {
  @Field()
  @Column()
  followerId: string;

  @Field({ nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @Field()
  @Column()
  followingId: string;

  @Field({ nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'followingId' })
  following: User;

  @Field()
  @Column({ enum: ConnectionStatus, default: ConnectionStatus.PENDING })
  status: ConnectionStatus;
}

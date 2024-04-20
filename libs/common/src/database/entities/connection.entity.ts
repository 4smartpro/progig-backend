import { AbstractEntity } from '@app/common';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

registerEnumType(ConnectionStatus, { name: 'ConnectionStatus' });

@ObjectType()
@Entity()
export class Connection extends AbstractEntity {
  @Field({ nullable: true })
  @Column()
  followerId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @Field({ nullable: true })
  @Column()
  followingId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followingId' })
  following: User;

  @Field()
  @Column({
    enum: ConnectionStatus,
    default: ConnectionStatus.PENDING,
    type: 'enum',
  })
  status: ConnectionStatus;
}

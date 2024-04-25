import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';
import { AbstractEntity } from '../abstract.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Message extends AbstractEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  attachment?: string;

  @Field(() => Boolean)
  @Column({ default: false })
  seen: boolean;

  @Field()
  @Column()
  senderId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Field()
  @Column()
  chatId: string;

  @Field(() => Chat, { nullable: true })
  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
}

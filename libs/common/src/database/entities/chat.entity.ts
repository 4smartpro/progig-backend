import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.entity';
import { Message } from './message.entity';

export enum ChatUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

registerEnumType(ChatUserRole, { name: 'ChatUserRole' });

@ObjectType()
@Entity()
export class Chat extends AbstractEntity {
  @Field({ nullable: true })
  @Column()
  senderId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Field({ nullable: true })
  @Column()
  receiverId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Field(() => [Message], { defaultValue: [] })
  @OneToMany(() => Message, (s) => s.chat)
  conversations: Message[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastMessageId: string;

  @Field(() => Message, { nullable: true })
  @OneToOne(() => Message, (s) => s.chat)
  @JoinColumn({ name: 'lastMessageId' })
  lastMessage: Message;

  @Field({ defaultValue: 0 })
  unseen: number;

  @Field({ defaultValue: 0 })
  totalUnseen: number;
}

@ObjectType()
@Entity()
export class ChatUser extends AbstractEntity {
  @Field()
  @Column()
  chatId: string;

  @Field(() => Chat, { nullable: true })
  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Field()
  @Column()
  userId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => ChatUserRole)
  @Column({ type: 'enum', enum: ChatUserRole, default: ChatUserRole.ADMIN })
  role: ChatUserRole;
}

// Entity added

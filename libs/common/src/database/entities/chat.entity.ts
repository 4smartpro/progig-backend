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
  @Field(() => [ChatUser])
  @OneToMany(() => ChatUser, (s) => s.chatId)
  users: ChatUser[];

  @Field(() => [Message])
  @OneToMany(() => Message, (s) => s.chatId)
  conversation: Message[];

  @Field()
  @OneToOne(() => Message)
  @JoinColumn({ name: 'lastMessageId' })
  lastMessage: Message;
}

@ObjectType()
@Entity()
export class ChatUser extends AbstractEntity {
  @Field()
  @Column()
  chatId: string;

  @Field()
  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Field()
  @Column()
  userId: string;

  @Field()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column({ type: 'enum', enum: ChatUserRole, default: ChatUserRole.ADMIN })
  role: ChatUserRole;
}

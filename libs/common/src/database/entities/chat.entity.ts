import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { Field, registerEnumType } from '@nestjs/graphql';
import { User } from './user.entity';

export enum ChatUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

registerEnumType(ChatUserRole, { name: 'ChatUserRole' });

@Entity()
export class Chat extends AbstractEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ default: false })
  isGroup: boolean;

  @Field(() => [ChatUser])
  @OneToMany(() => ChatUser, (s) => s.chatId)
  users: ChatUser[];

  @Field(() => [Message])
  @OneToMany(() => Message, (s) => s.chatId)
  conversation: Message[];
}

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

export class Message extends AbstractEntity {
  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  chatId: string;

  @Field()
  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
}

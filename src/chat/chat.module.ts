import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, ChatUser, Message } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, ChatUser])],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message } from '@app/common';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), UserModule],
  providers: [ChatResolver, ChatService, UserService],
})
export class ChatModule {}

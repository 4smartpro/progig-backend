import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message, Upload } from '@app/common';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { ConnectionService } from 'src/connection/connection.service';
import { ConnectionModule } from 'src/connection/connection.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message]),
    UserModule,
    ConnectionModule,
  ],
  providers: [
    ChatResolver,
    ChatService,
    UserService,
    ConnectionService,
    Upload,
  ],
})
export class ChatModule {}

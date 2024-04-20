import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, User } from '@app/common';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Connection, User])],
  providers: [ConnectionResolver, ConnectionService, UserService],
  exports: [TypeOrmModule, ConnectionService],
})
export class ConnectionModule {}

import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  providers: [ConnectionResolver, ConnectionService],
})
export class ConnectionModule {}

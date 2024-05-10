import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AzureFilesService, Connection, User } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([User, Connection])],
  providers: [UserResolver, UserService, AzureFilesService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}

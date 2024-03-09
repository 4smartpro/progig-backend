import { Module } from '@nestjs/common';
import { DatabaseModule, GraphQLModule } from '@app/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GigModule } from './gig/gig.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GraphQLModule,
    AuthModule,
    UserModule,
    GigModule,
  ],
})
export class AppModule {}

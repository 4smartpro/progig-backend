import { Module } from '@nestjs/common';
import { DatabaseModule, GraphQLModule } from '@app/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GigModule } from './gig/gig.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionModule } from './connection/connection.module';
import * as Joi from 'joi';
import { ChatModule } from './chat/chat.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        // MYSQL_DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
        AZURE_CONNECTION_STRING: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    DatabaseModule,
    GraphQLModule,
    AuthModule,
    UserModule,
    GigModule,
    ConnectionModule,
    ChatModule,
    ContractModule,
  ],
})
export class AppModule {}

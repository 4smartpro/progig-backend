import { Module } from '@nestjs/common';
import { DatabaseModule, GraphQLModule } from '@app/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GigModule } from './gig/gig.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionModule } from './connection/connection.module';
import * as Joi from 'joi';

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
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    DatabaseModule,
    // DatabaseModule.switchMySQL(),
    GraphQLModule,
    AuthModule,
    UserModule,
    GigModule,
    ConnectionModule,
  ],
})
export class AppModule {}

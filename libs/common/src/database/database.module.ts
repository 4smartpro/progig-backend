import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import getMigragions from './migration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          url: configService.get('MYSQL_DATABASE_URL'),
          logging: false,
          synchronize: true,
          migrations: getMigragions(),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

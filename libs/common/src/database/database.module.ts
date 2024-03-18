import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import getMigragions from './migration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
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
export class DatabaseModule {
  // static switchMySQL(): DynamicModule {
  //   return {
  //     module: DatabaseModule,
  //     imports: [
  //       TypeOrmModule.forRootAsync({
  //         useFactory: (configService: ConfigService) => {
  //           return {
  //             type: 'mysql',
  //             host: configService.get('MYSQL_HOST'),
  //             port: configService.get('MYSQL_PORT'),
  //             username: configService.get('MYSQL_USER'),
  //             password: configService.get('MYSQL_PASSWORD'),
  //             database: configService.get('MYSQL_DB'),
  //             // url: configService.get('MYSQL_DATABASE_URL'),
  //             logging: false,
  //             synchronize: true,
  //             migrations: getMigragions(),
  //             autoLoadEntities: true,
  //           };
  //         },
  //         inject: [ConfigService],
  //       }),
  //     ],
  //   };
  // }
}

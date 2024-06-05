import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([OTP]),
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRES_IN')}d`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],

  providers: [
    AuthResolver,
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}

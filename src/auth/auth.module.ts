import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalUserStrategy } from './strategies/local-user.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('jwtSecret'),
          signOptions: {
            expiresIn: config.get<string | number>('jwtExpirationTime'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalUserStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, LocalUserStrategy, JwtStrategy],
})
export class AuthModule {}

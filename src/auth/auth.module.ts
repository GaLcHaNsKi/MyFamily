import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY ?? "",
      signOptions: { expiresIn: '30d' }, // Токен будет жить 1 день
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, PrismaService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {} 
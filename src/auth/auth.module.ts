import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from '../common';
import { UsersModule } from '../users';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}

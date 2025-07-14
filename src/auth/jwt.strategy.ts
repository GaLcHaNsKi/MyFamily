import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY ?? "",
    });
  }

  async validate(payload: any) {
    // В 'payload' будут расшифрованные данные из токена
    // То, что вернет этот метод, будет добавлено в объект request.user
    return { userId: payload.sub, username: payload.username };
  }
} 
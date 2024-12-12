import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './jwt-contanst';
import { Payload } from '../auth.service';
import { JwtStrategyInterface } from '../interface/jwt-strategy.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Payload): Promise<JwtStrategyInterface> {
    //TODO id, name
    return {
      companyId: payload.companyId,
      userId: payload.userId,
      name: payload.user,
      role: payload.rolePrimary,
    };
  }
}

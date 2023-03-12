import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'clientId', passwordField: 'secretKey' });
  }

  validate(clientId: string, secretKey: string) {
    const tokens = this.authService.validateCredentials({
      clientId,
      secretKey,
    });
    if (!tokens) {
      throw new UnauthorizedException();
    }
    return tokens;
  }
}

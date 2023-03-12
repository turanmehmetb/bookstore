import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import mongoose from 'mongoose';

export type Credentials = {
  // credentials will provided to client
  clientId: string;
  secretKey: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  private credentials: Credentials;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.credentials = {
      clientId: new mongoose.Types.ObjectId().toString(),
      secretKey: crypto.randomBytes(16).toString('base64'),
    };
  }

  getCredentials(): Credentials {
    return this.credentials;
  }

  validateCredentials(credentials: Credentials): boolean {
    return (
      credentials.clientId == this.credentials.clientId &&
      credentials.secretKey == this.credentials.secretKey
    );
  }

  getTokens(clientId: string): Tokens {
    const accessToken = this.jwtService.sign(
      { clientId: clientId },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'), // token secrets stored as env variables
        expiresIn: '5m',
      },
    );
    const refreshToken = this.jwtService.sign(
      { clientId: clientId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
    return { accessToken, refreshToken };
  }
}

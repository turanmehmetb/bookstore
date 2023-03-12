import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './controller/auth.controller';
import { AuthService, Credentials, Tokens } from './service/auth.service';

const CREDENTIALS: Credentials = {
  clientId: '123',
  secretKey: '123',
};

const TOKENS: Tokens = {
  accessToken: 'xxx',
  refreshToken: 'xxx',
};

describe('Auth', () => {
  let app: TestingModule;
  let authService: AuthService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AuthService, JwtService, ConfigService],
      controllers: [AuthController],
    }).compile();

    authService = app.get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Get credentials', () => {
    it('should get credentials', () => {
      jest.spyOn(authService, 'getCredentials').mockReturnValue(CREDENTIALS);
      const result = authService.getCredentials();
      expect(result).toEqual(CREDENTIALS);
    });
  });

  describe('Validate credentials', () => {
    it('should return true', () => {
      jest.spyOn(authService, 'validateCredentials').mockReturnValue(true);
      const result = authService.validateCredentials(CREDENTIALS);
      expect(result).toEqual(true);
    });
  });

  describe('Get tokens', () => {
    it('should return tokens', () => {
      jest.spyOn(authService, 'getTokens').mockReturnValue(TOKENS);
      const result = authService.getTokens(CREDENTIALS.clientId);
      expect(result).toEqual(TOKENS);
    });
  });
});

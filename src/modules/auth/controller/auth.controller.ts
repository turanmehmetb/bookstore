import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, Credentials, Tokens } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('credentials')
  getCredentials(): Credentials {
    return this.authService.getCredentials();
  }

  @UseGuards(AuthGuard('local'))
  @Get('tokens')
  getTokens(
    @Query('clientId') clientId: string,
    @Query('secretKey') secretKey: string,
  ): Tokens {
    return this.authService.getTokens(clientId);
  }

  @UseGuards(AuthGuard('refreshToken'))
  @ApiBearerAuth('refreshToken-auth')
  @Get('refreshTokens')
  refreshTokens(@Query('clientId') clientId: string) {
    return this.authService.getTokens(clientId);
  }
}

import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { skipAuth } from './decorator/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@skipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }

  @Post('login')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }

  @skipAuth()
  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    try {
      const accessToken = await this.authService.refreshAccessToken(
        refreshDto.token,
      );

      return {
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}

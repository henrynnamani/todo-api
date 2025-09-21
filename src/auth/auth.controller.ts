import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { skipAuth } from './decorator/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { registerDoc } from './docs/register.doc';
import { loginDoc } from './docs/login.doc';
import { refreshDoc } from './docs/refresh.doc';

@skipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @registerDoc()
  signup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }

  @loginDoc()
  @Post('login')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }

  @refreshDoc()
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

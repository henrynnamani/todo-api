import {
  Injectable,
  Req,
  RequestTimeoutException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { DB_CONNECTION_ERROR } from 'src/common/system-message';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from './dto/refresh.dto';
import { User } from 'src/user/model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(registerDto: RegisterDto) {
    try {
      const hashPassword = await this.hashPassword(registerDto.password);

      const user = await this.userService.createUser({
        ...registerDto,
        password: hashPassword,
      });

      const payload = {
        sub: user.id,
      };

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
      });

      return {
        token,
      };
    } catch (err) {}
  }

  async signin(loginDto: LoginDto) {
    try {
      const user = await this.userService.checkUserExistByEmail(loginDto.email);

      const passwordVerified = await this.comparePassword(
        loginDto.password,
        user.password,
      );

      if (!passwordVerified) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: user.id,
      };

      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
      });

      const user = await this.userService.checkUserExistById(decoded.sub);
      if (!user) {
        throw new Error('User not found');
      }

      return this.generateAccessToken(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async validateAccessToken(accessToken: string) {
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
      });
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  async hashPassword(data: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  async comparePassword(data: string, hashedPassword: string) {
    return bcrypt.compare(data, hashedPassword);
  }

  async generateAccessToken(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
      expiresIn: '7d',
    });
  }
}

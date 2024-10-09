import {Tokens} from '@features/user/model/verifyToken.model';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getTokens(payload: any): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_AT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      const secret = this.configService.get<string>('JWT_AT_SECRET');
      return this.jwtService.verifyAsync(token, {
        secret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid Access Token');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const secret = this.configService.get<string>('JWT_RT_SECRET');
      return this.jwtService.verifyAsync(token, {
        secret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}

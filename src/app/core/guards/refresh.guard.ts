import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {TokenService} from '@shared/services/token.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request?.headers['authorization']?.split('Bearer ')[1];

    if (!token) {
      return false;
    }
    try {
      const result = await this.tokenService.verifyRefreshToken(token);
      request.user = result;
      return true;
    } catch (err) {
      return false;
    }
  }
}

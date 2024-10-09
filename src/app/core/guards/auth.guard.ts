import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {TokenService} from '@shared/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; // Skip authentication for public endpoints
    }
    const request = context.switchToHttp().getRequest();

    const token = request?.headers['authorization']?.split('Bearer ')[1];
    try {
      const result = await this.tokenService.verifyAccessToken(token);
      request.user = result;
      return true;
    } catch (err) {
      return false;
    }
  }
}

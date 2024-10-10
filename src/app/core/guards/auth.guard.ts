import {UserService} from '@features/user/user.service';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; // Skip authentication for public endpoints
    }
    const request = context.switchToHttp().getRequest();

    const token = request?.headers['authorization']?.split('Bearer ')[1];
    try {
      const result = await this.userService.verifyAccessToken(token);
      request.user = result;
      return true;
    } catch (err) {
      return false;
    }
  }
}

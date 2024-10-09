import {Global, Module} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {PasswordService} from '@shared/services/password-service.service';
import {PrismaService} from '@shared/services/prisma.service';
import {TokenService} from '@shared/services/token.service';

@Global()
@Module({
  providers: [PasswordService, PrismaService, TokenService, JwtService],
  exports: [PasswordService, PrismaService, TokenService, JwtService],
})
export class SharedModule {}

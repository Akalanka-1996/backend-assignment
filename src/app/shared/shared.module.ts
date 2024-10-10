import {Global, Module} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {PasswordService} from '@shared/services/password-service.service';
import {PrismaService} from '@shared/services/prisma.service';

@Global()
@Module({
  providers: [PasswordService, PrismaService, JwtService],
  exports: [PasswordService, PrismaService, JwtService],
})
export class SharedModule {}

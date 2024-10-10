import {Module} from '@nestjs/common';
import {UserService} from '@features/user/user.service';
import {UserController} from '@features/user/user.controller';
import {UserRepository} from '@features/user/repository/user.repository';
import {PrismaService} from '@shared/services/prisma.service';
import {PasswordService} from '@shared/services/password-service.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, PasswordService],
  exports: [UserService],
})
export class UserModule {}

import {Body, Controller, Post, UseInterceptors} from '@nestjs/common';
import {UserService} from '@features/user/user.service';
import {ApiResources} from '@core/constants/resource-constants';
import {ApiTags} from '@nestjs/swagger';
import {Public} from '@core/decorators/public.decorator';
import {CreateUserDto} from '@features/user/dto/create-user.dto';
import {LowerCaseEmailInterceptor} from '@core/interceptors/lower-case-email.interceptor';
import {EmailValidationPipe} from '@shared/pipes/email-validation.pipe';
import {Tokens} from '@features/user/model/verifyToken.model';
import {LoginUserDto} from '@features/user/dto/login-user.dto';

@Controller(ApiResources.USER)
@ApiTags(ApiResources.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @UseInterceptors(LowerCaseEmailInterceptor)
  async create(@Body(new EmailValidationPipe()) createUserDto: CreateUserDto): Promise<Tokens> {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  @Public()
  @UseInterceptors(LowerCaseEmailInterceptor)
  async login(@Body(new EmailValidationPipe()) loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.userService.login(loginUserDto);
  }
}

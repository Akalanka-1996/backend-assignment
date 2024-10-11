import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {UserService} from '@features/user/user.service';
import {ApiResources} from '@core/constants/resource-constants';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Public} from '@core/decorators/public.decorator';
import {CreateUserDto} from '@features/user/dto/create-user.dto';
import {LowerCaseEmailInterceptor} from '@core/interceptors/lower-case-email.interceptor';
import {EmailValidationPipe} from '@shared/pipes/email-validation.pipe';
import {Tokens} from '@features/user/model/verifyToken.model';
import {LoginUserDto} from '@features/user/dto/login-user.dto';
import {RefreshGuard} from '@core/guards/refresh.guard';
import {User} from '@core/decorators/user.decorator';

@Controller(ApiResources.USER)
@ApiTags(ApiResources.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @UseInterceptors(LowerCaseEmailInterceptor)
  @ApiOperation({summary: 'Register user'})
  async create(@Body(new EmailValidationPipe()) createUserDto: CreateUserDto): Promise<Tokens> {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  @Public()
  @UseInterceptors(LowerCaseEmailInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Login user'})
  async login(@Body(new EmailValidationPipe()) loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.userService.login(loginUserDto);
  }

  @Post('/refresh')
  @Public()
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Refresh token'})
  async refreshTokens(@User() user: any): Promise<Tokens> {
    return this.userService.refreshTokens(user);
  }

  @Post('/logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Logout user'})
  async logout(@User() user: any): Promise<void> {
    return this.userService.logout(user);
  }
}

import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from '@features/user/repository/user.repository';
import {PasswordService} from '@shared/services/password-service.service';
import {CreateUserDto} from '@features/user/dto/create-user.dto';
import {Tokens} from '@features/user/model/verifyToken.model';
import {LoginUserDto} from '@features/user/dto/login-user.dto';
import {TokenService} from '@shared/services/token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: CreateUserDto): Promise<Tokens> {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(`Email already exists.`);
    }

    const hashedPassword = await this.passwordService.hashPassword(dto.password);
    dto.password = hashedPassword;

    const cratedUser = await this.userRepository.createUser(dto);

    const payload = {
      user_id: cratedUser.id,
    };
    const tokens = await this.tokenService.getTokens(payload);
    await this.updateRtHash(tokens.refresh_token, cratedUser.id);
    return tokens;
  }

  async login(dto: LoginUserDto): Promise<Tokens> {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (!existingUser) {
      throw new NotFoundException(`Account not found`);
    }

    const isValidPassword = await this.passwordService.comparePasswords(dto.password, existingUser.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const payload = {
      user_id: existingUser.id,
    };
    const tokens = await this.tokenService.getTokens(payload);
    await this.updateRtHash(tokens.refresh_token, existingUser.id);
    return tokens;
  }

  async getUserById(user: any) {
    const userById = await this.userRepository.getUserById(user.id);

    if (!userById) {
      throw new NotFoundException(`Account not found`);
    }

    return userById;
  }

  async refreshTokens(user: any): Promise<Tokens> {
    const userById = await this.getUserById(user.id);

    const payload = {
      user_id: userById.id,
    };
    const tokens = await this.tokenService.getTokens(payload);
    await this.updateRtHash(tokens.refresh_token, userById.id);
    return tokens;
  }

  async updateRtHash(token: string, user: any): Promise<void> {
    const rtHash = await this.passwordService.hashPassword(token);
    await this.userRepository.updateRefreshToken(user.id, rtHash);
  }
}

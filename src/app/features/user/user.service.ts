import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from '@features/user/repository/user.repository';
import {PasswordService} from '@shared/services/password-service.service';
import {CreateUserDto} from '@features/user/dto/create-user.dto';
import {JwtService} from '@nestjs/jwt';
import {Tokens} from '@features/user/model/verifyToken.model';
import {ConfigService} from '@nestjs/config';
import {LoginUserDto} from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: CreateUserDto): Promise<Tokens> {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(`Email already exists.`);
    }

    const hashedPassword = await this.passwordService.hashPassword(dto.password);
    dto.password = hashedPassword;

    const user = await this.userRepository.createUser(dto);

    const payload = {
      user_id: user.id,
    };
    const tokens = await this.getTokens(payload);

    return tokens;
  }

  async login(dto: LoginUserDto): Promise<Tokens> {
    const existingUser = await this.userRepository.getUserByEmail(dto.email);
    if (!existingUser) {
      throw new BadRequestException(`Account not found`);
    }

    const isValidPassword = await this.passwordService.comparePasswords(dto.password, existingUser.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const payload = {
      user_id: existingUser.id,
    };
    const tokens = await this.getTokens(payload);

    return tokens;
  }

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
}

import {Injectable} from '@nestjs/common';
import {PrismaService} from '@shared/services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(dto: any) {
    return await this.prismaService.user.create({
      data: dto,
    });
  }
}

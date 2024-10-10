import {PrismaService} from '@shared/services/prisma.service';
import {CreateLocationDto} from '@features/location/dto/create-location.dto';

export class LocationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createLocation(dto: CreateLocationDto) {
    console.log('dto', dto)
    try {
      return await this.prismaService.location.create({
        data: dto,
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}

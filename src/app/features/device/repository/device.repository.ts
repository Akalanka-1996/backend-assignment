import {Injectable} from '@nestjs/common';
import {PrismaService} from '@shared/services/prisma.service';
import {CreateDeviceDto} from '@features/device/dto/create-device.dto';
import {UpdateDeviceDto} from '@features/device/dto/update-device.dto';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createDevice(dto: CreateDeviceDto) {
    return await this.prismaService.device.create({
      data: {
        name: dto.name,
        serialNumber: dto.serialNumber,
        description: dto.description,
        imageUrl: dto.imageUrl,
        locationId: dto.locationId,
        type: dto.type,
        status: dto.status,
      },
    });
  }

  async getDeviceById(id: number) {
    return await this.prismaService.device.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getDeviceBySerialNumber(serialNumber: string) {
    return await this.prismaService.device.findUnique({
      where: {
        serialNumber: serialNumber,
      },
    });
  }

  async getDeviceList(page: number, limit: number) {
    const skip = (page - 1) * limit;

    return await this.prismaService.device.findMany({
      skip,
      take: limit,
      include: {
        location: {
          select: {
            id: true,
            title: true,
            address: true,
          },
        },
      },
    });
  }

  async getDeviceListByLocation(locationId: number) {
    return await this.prismaService.device.findMany({
      where: {
        locationId: locationId,
      },
    });
  }

  async countDevicesByLocation(locationId: number): Promise<number> {
    return await this.prismaService.device.count({
      where: {locationId},
    });
  }

  async updateDevice(id: number, dto: UpdateDeviceDto) {
    return await this.prismaService.device.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async deleteDevice(id: number) {
    await this.prismaService.device.delete({
      where: {
        id: id,
      },
    });
  }
}

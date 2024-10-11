import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {DeviceRepository} from '@features/device/repository/device.repository';
import {LocationService} from '@features/location/location.service';
import {CreateDeviceDto} from '@features/device/dto/create-device.dto';
import {Device} from '@prisma/client';
import {UpdateDeviceDto} from '@features/device/dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly locationService: LocationService,
  ) {}

  async create(dto: CreateDeviceDto): Promise<Device> {
    const location = await this.locationService.getById(dto.locationId);

    if (!location) {
      throw new BadRequestException(`The location with id ${dto.locationId} does not exist`);
    }

    const deviceBySerialNumber = await this.deviceRepository.getDeviceBySerialNumber(dto.serialNumber);

    if (deviceBySerialNumber) {
      throw new BadRequestException(`Duplicate Serial Number`);
    }

    const deviceCountByLocation = await this.deviceRepository.countDevicesByLocation(dto.locationId);

    if (deviceCountByLocation >= 10) {
      throw new BadRequestException(
        `The location with id ${dto.locationId} already has maximum number of(10) devices.`,
      );
    }
    return await this.deviceRepository.createDevice(dto);
  }

  async get(page: number, limit: number): Promise<Device[]> {
    return await this.deviceRepository.getDeviceList(page, limit);
  }

  async getByLocation(locationId: number) {
    const location = await this.locationService.getById(locationId);

    if (!location) {
      throw new BadRequestException(`The location with id ${locationId} does not exist`);
    }

    return this.deviceRepository.getDeviceListByLocation(locationId);
  }

  async getById(deviceId: number): Promise<Device> {
    return this.findDeviceById(deviceId);
  }

  async update(dto: UpdateDeviceDto, deviceId: number): Promise<Device> {
    const device = await this.findDeviceById(deviceId);

    return await this.deviceRepository.updateDevice(device.id, dto);
  }

  async delete(locationId: number) {
    const device = await this.findDeviceById(locationId);

    await this.deviceRepository.deleteDevice(device.id);
  }

  private async findDeviceById(deviceId: number): Promise<Device> {
    const device = await this.deviceRepository.getDeviceById(deviceId);

    if (!device) {
      throw new NotFoundException(`Device with ID ${deviceId} not found`);
    }

    return device;
  }
}

import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {DeviceService} from '@features/device/device.service';
import {ApiResources} from '@core/constants/resource-constants';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateDeviceDto} from '@features/device/dto/create-device.dto';
import {Device} from '@features/device/entity/device.entity';
import {UpdateDeviceDto} from '@features/device/dto/update-device.dto';

@ApiBearerAuth()
@Controller(ApiResources.DEVICE)
@ApiTags(ApiResources.DEVICE)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(): Promise<Device[]> {
    return await this.deviceService.get();
  }

  @Get('location')
  @HttpCode(HttpStatus.OK)
  async getByLocation(@Query('locationId') locationId: string): Promise<Device[]> {
    return await this.deviceService.getByLocation(+locationId);
  }

  @Get(`:id`)
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') deviceId: string): Promise<Device> {
    return await this.deviceService.getById(+deviceId);
  }

  @Patch(`:id`)
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateDeviceDto: UpdateDeviceDto, @Param('id') deviceId: string): Promise<Device> {
    return await this.deviceService.update(updateDeviceDto, +deviceId);
  }

  @Delete(`:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') deviceId: string): Promise<void> {
    return await this.deviceService.delete(+deviceId);
  }
}

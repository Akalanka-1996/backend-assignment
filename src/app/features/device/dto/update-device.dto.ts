import {PartialType} from '@nestjs/swagger';
import {CreateDeviceDto} from '@features/device/dto/create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}

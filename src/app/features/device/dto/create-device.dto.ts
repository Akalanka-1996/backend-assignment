import {PickType} from '@nestjs/swagger';
import {Device} from '@features/device/entity/device.entity';

export class CreateDeviceDto extends PickType(Device, [
  `name`,
  `serialNumber`,
  `description`,
  `imageUrl`,
  `locationId`,
  `type`,
  `status`,
]) {}

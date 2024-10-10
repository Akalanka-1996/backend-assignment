import {Module} from '@nestjs/common';
import {DeviceService} from '@features/device/device.service';
import {DeviceController} from '@features/device/device.controller';
import {DeviceRepository} from '@features/device/repository/device.repository';
import {LocationModule} from '@features/location/location.module';
import {PrismaService} from '@shared/services/prisma.service';

@Module({
  imports: [LocationModule],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository, PrismaService],
})
export class DeviceModule {}

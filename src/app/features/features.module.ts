import {Module} from '@nestjs/common';
import {UserModule} from '@features/user/user.module';
import {LocationModule} from '@features/location/location.module';
import {DeviceModule} from '@features/device/device.module';

@Module({
  imports: [UserModule, LocationModule, DeviceModule],
})
export class FeaturesModule {}

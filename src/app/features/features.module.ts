import {Module} from '@nestjs/common';
import {UserModule} from '@features/user/user.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [UserModule, LocationModule],
})
export class FeaturesModule {}

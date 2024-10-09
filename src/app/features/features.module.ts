import {Module} from '@nestjs/common';
import {UserModule} from '@features/user/user.module';

@Module({
  imports: [UserModule],
})
export class FeaturesModule {}

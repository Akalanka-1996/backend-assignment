import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {FeaturesModule} from '@features/features.module';
import {ConfigModule} from '@config/config.module';
import {AuthGuard} from '@guards/auth.guard';
import {SharedModule} from '@shared/shared.module';
import {UserService} from '@features/user/user.service';
import {UserRepository} from '@features/user/repository/user.repository';

@Module({
  imports: [ConfigModule, FeaturesModule, SharedModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserService,
    UserRepository,
  ],
})
export class AppModule {}

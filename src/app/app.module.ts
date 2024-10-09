import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {FeaturesModule} from '@features/features.module';
import {ConfigModule} from '@config/config.module';
import {AuthGuard} from '@guards/auth.guard';
import { PrismaService } from './shared/services/prisma.service';

@Module({
  imports: [ConfigModule, FeaturesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}

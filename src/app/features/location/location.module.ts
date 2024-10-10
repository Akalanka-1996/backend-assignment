import {Module} from '@nestjs/common';
import {LocationService} from '@features/location/location.service';
import {LocationController} from '@features/location/location.controller';
import {LocationRepository} from '@features/location/repository/location.repository';
import {PrismaService} from '@shared/services/prisma.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationRepository, PrismaService],
})
export class LocationModule {}

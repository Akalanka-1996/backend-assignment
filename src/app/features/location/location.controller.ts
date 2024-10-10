import {Body, Controller, Post} from '@nestjs/common';
import {LocationService} from '@features/location/location.service';
import {ApiResources} from '@core/constants/resource-constants';
import {ApiTags} from '@nestjs/swagger';
import {CreateLocationDto} from '@features/location/dto/create-location.dto';

@Controller(ApiResources.LOCATION)
@ApiTags(ApiResources.LOCATION)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto): Promise<any> {
    return this.locationService.create(createLocationDto);
  }
}

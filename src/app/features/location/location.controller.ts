import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {LocationService} from '@features/location/location.service';
import {ApiResources} from '@core/constants/resource-constants';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateLocationDto} from '@features/location/dto/create-location.dto';
import {Location} from '@features/location/entity/location.entity';
import {UpdateLocationDto} from '@features/location/dto/update-location.dto';

@ApiBearerAuth()
@Controller(ApiResources.LOCATION)
@ApiTags(ApiResources.LOCATION)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({summary: 'Create a location'})
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all locations'})
  async getLocations(): Promise<Location[]> {
    return await this.locationService.getLocations();
  }

  @Get(`:id`)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get a location by id'})
  async getById(@Param('id') locationId: string): Promise<Location> {
    return await this.locationService.getById(+locationId);
  }

  @Patch(`:id`)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Update a location'})
  async update(@Body() updateLocationDto: UpdateLocationDto, @Param('id') locationId: string): Promise<Location> {
    return await this.locationService.updateLocation(updateLocationDto, +locationId);
  }

  @Delete(`:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Delete a location'})
  async delete(@Param('id') locationId: string): Promise<void> {
    return await this.locationService.delete(+locationId);
  }
}

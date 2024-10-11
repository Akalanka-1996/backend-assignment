import {Injectable, NotFoundException} from '@nestjs/common';
import {LocationRepository} from '@features/location/repository/location.repository';
import {CreateLocationDto} from '@features/location/dto/create-location.dto';
import {Location} from '@features/location/entity/location.entity';
import {UpdateLocationDto} from '@features/location/dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    return await this.locationRepository.createLocation(dto);
  }

  async getLocations(page: number, limit: number): Promise<Location[]> {
    return await this.locationRepository.getLocationList(page, limit);
  }

  async getById(locationId: number): Promise<Location> {
    return this.findLocationById(locationId);
  }

  async updateLocation(dto: UpdateLocationDto, locationId: number): Promise<Location> {
    const location = await this.findLocationById(locationId);

    return await this.locationRepository.updateLocationById(location.id, dto);
  }

  async delete(locationId: number) {
    const location = await this.findLocationById(locationId);

    await this.locationRepository.deleteLocationById(location.id);
  }

  private async findLocationById(locationId: number): Promise<Location> {
    const location = await this.locationRepository.getLocationById(locationId);

    if (!location) {
      throw new NotFoundException(`Location with ID ${locationId} not found`);
    }

    return location;
  }
}

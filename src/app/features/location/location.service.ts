import {Injectable} from '@nestjs/common';
import {LocationRepository} from '@features/location/repository/location.repository';
import {CreateLocationDto} from '@features/location/dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async create(dto: CreateLocationDto) {
    return await this.locationRepository.createLocation(dto);
  }
}

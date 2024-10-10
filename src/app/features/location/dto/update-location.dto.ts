import {PartialType} from '@nestjs/swagger';
import {CreateLocationDto} from '@features/location/dto/create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}

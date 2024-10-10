import {PickType} from '@nestjs/swagger';
import {Location} from '@features/location/entity/location.entity';

export class CreateLocationDto extends PickType(Location, [`title`, `address`, `status`]) {}

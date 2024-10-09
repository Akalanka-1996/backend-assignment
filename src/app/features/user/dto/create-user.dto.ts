import {PickType} from '@nestjs/swagger';
import {User} from '@features/user/entity/user.entity';

export class CreateUserDto extends PickType(User, [`first_name`, `last_name`, `email`, `password`]) {}

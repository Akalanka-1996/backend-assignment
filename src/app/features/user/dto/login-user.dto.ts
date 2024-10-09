import {PickType} from '@nestjs/swagger';
import {User} from '@features/user/entity/user.entity';

export class LoginUserDto extends PickType(User, [`email`, `password`]) {}

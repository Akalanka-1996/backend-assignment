import {createMethodDecorator} from '@nestjs/swagger/dist/decorators/helpers';

export const Public: MethodDecorator = createMethodDecorator('isPublic', true);

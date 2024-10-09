import {Module} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config';
import * as Joi from 'joi';
import {NodeEnvironment} from '@shared/models/env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...Object.values(NodeEnvironment))
          .default(NodeEnvironment.DEV),
        PORT: Joi.number().default('3000'),
      }),
    }),
  ],
})
export class ConfigModule {}

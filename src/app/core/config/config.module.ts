import {Logger, Module, NotAcceptableException} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config';
import {EnvironmentConfig} from '@shared/models/env/environment-config.model';
import {validateSync} from 'class-validator';
@Module({
  imports: [
    /**
     * Validate and make the ConfigService available across the application
     */
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: config => {
        const logger = new Logger(ConfigModule.name);

        const environmentConfig = new EnvironmentConfig();

        Object.assign(environmentConfig, config);

        logger.log(`Validating environment variables`);

        const results = validateSync(environmentConfig, {
          forbidUnknownValues: false,
        });

        if (results.length > 0) {
          throw new NotAcceptableException(
            results.map(value => value.toString(false)).join(','),
            'Invalid environment variable config',
          );
        }

        logger.log(`Environment variables validated`);

        return environmentConfig;
      },
    }),
  ],
})
export class ConfigModule {}

import {IsEnum, IsNotEmpty, IsOptional, IsPort, IsString} from 'class-validator';
import {NodeEnvironment} from '../env';

export class EnvironmentConfig {
  @IsOptional()
  @IsPort()
  PORT = `3002`;

  @IsOptional()
  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment = NodeEnvironment.DEV;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_AT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_RT_SECRET: string;
}

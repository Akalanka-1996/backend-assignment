export enum NodeEnvironment {
  DEV = 'DEV',
  PRODUCTION = 'PRODUCTION',
}

export interface EnvironmentConfig {
  PORT: string;
  NODE_ENV: NodeEnvironment;
}

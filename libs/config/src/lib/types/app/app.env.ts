import { IsEnum, IsString, NotEquals } from 'class-validator';
import { Expose } from 'class-transformer';

export enum LogLevel {
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum ENVS {
  PRODUCTION = 'production',
  DEV = 'dev',
}

export class AppEnv {
  @IsString()
  @NotEquals('')
  @Expose()
  APP_SECRET: string;

  @IsString()
  @NotEquals('')
  @Expose()
  APP_REFRESH_SECRET: string;

  @IsEnum(LogLevel)
  @Expose()
  APP_LOG_LEVEL: LogLevel = LogLevel.INFO;

  @IsEnum(ENVS)
  @Expose()
  APP_CURRENT_ENV: ENVS = ENVS.DEV;
}

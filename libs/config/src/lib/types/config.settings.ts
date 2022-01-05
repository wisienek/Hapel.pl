import {
  getValidationFunction,
  ConfigSettings,
  ConfigType,
} from './config.type';
import { DbConfig, DbEnv } from './db';
import { AppConfig, AppEnv } from './app';
import { ClassConstructor } from 'class-transformer';
import { BaseConfig } from './base.config';

export type ConfigEnvs = {
  DB: DbEnv;
  APP: AppEnv;
};

export class ConfigSettingsClass {
  private settings: ConfigSettings = {
    DB: {
      fn: getValidationFunction(DbEnv),
      configClass: DbConfig,
    },
    APP: {
      fn: getValidationFunction(AppEnv),
      configClass: AppConfig,
    },
  };

  public getSettings(config: ClassConstructor<BaseConfig<ConfigType>>) {
    for (const [key, value] of Object.entries(this.settings)) {
      if (value.configClass.name === config.name) {
        return { fn: value.fn, configType: key as ConfigType };
      }
    }
  }
}
